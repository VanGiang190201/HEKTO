import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Spinner,
    Stack,
} from '@chakra-ui/react';
import * as React from 'react';
import { toast } from 'react-toastify';
import { Switch, Image, InputNumber } from 'antd';
import productApi from '../../API/productApi';
import categoryApi, { ICategoryGet } from '../../API/categoryApi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import commentsApi, { ICommentGet } from '../../API/commentApi';
import moment from 'moment';
import 'moment-timezone';
import { FaTrashAlt } from 'react-icons/fa';

interface FormViewProps {
    id: number;
    setIsChangeList?: any;
    isChangeList?: boolean;
}

const FormView: React.FunctionComponent<FormViewProps> = (props) => {
    const { id } = props;
    const [name, setName] = React.useState<string>('');
    const [price, setPrice] = React.useState<number>();
    const [sale, setSale] = React.useState<number>();
    const [description, setDescription] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [rate, setRate] = React.useState<number>();
    const [categoryId, setCategoryId] = React.useState<number>();
    const [image, setImage] = React.useState<any>();
    const [imagePreview, setImagePreview] = React.useState<any>();
    const [categories, setCategories] = React.useState<ICategoryGet[]>([]);
    const [isChange, setIsChange] = React.useState<boolean>(false);
    const [otherImage, setOtherImage] = React.useState<any>([]);
    const [comments, setComments] = React.useState<ICommentGet[]>([]);

    const CommentItem = ({ data }: any) => {
        const handleDeleteComment = () => {
            commentsApi.deleteComment(data.id).then((res) => {
                setIsChange(!isChange);
                toast.success(res.message, {
                    position: 'top-right',
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        };
        return (
            <StyleCom.CommentItem>
                <StyleCom.Avatar>
                    <Image
                        src={data.avatar}
                        alt=""
                        preview={false}
                    />
                </StyleCom.Avatar>
                <StyleCom.Comment>
                    <h3>{data.display_name}</h3>
                    <p className="time">
                        {moment(data.time_comment)
                            .tz('Asia/Ho_Chi_Minh')
                            .format('YYYY/MM/DD, h:mm:ss A')}
                    </p>
                    <p>{data.comment}</p>
                </StyleCom.Comment>
                <StyleCom.Trash onClick={handleDeleteComment}>
                    <FaTrashAlt fontSize="16px" />
                </StyleCom.Trash>
            </StyleCom.CommentItem>
        );
    };

    React.useEffect(() => {
        setIsLoading(true);
        productApi
            .getProductById(id)
            .then((res: any) => {
                setIsLoading(false);
                console.log(res);
                setName(res[0].name_product);
                setPrice(res[0].price_product);
                setSale(res[0].sale);
                setImagePreview(res[0].image_product);
                setDescription(res[0].description_product);
                setRate(res[0].rate);
                setCategoryId(res[0].category_id);
            })
            .catch((error) => setIsLoading(false));

        categoryApi.getAllCategory().then((res) => setCategories(res));

        productApi.getOtherImage(id).then((res) => setOtherImage(res));

        commentsApi.getComments(id).then((res) => setComments(res.data));
    }, [isChange]);

    return (
        <Style.Wrapper>
            <Stack>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Tên sản phẩm
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        isReadOnly
                        fontSize="1.4rem"
                        value={name}
                    />
                </FormControl>

                <FormControl
                    id="branch"
                    mb="0.5rem"
                >
                    <FormLabel
                        fontSize="1.5rem"
                        mb="0.6rem"
                    >
                        Giá sản phẩm (VNĐ)
                    </FormLabel>
                    <InputNumber
                        min={0}
                        disabled
                        style={{
                            width: '200px',
                            height: '40px',
                            color: '#000',
                        }}
                        value={price}
                    />
                </FormControl>
                <FormControl
                    id="branch"
                    mb="0.5rem"
                >
                    <FormLabel
                        fontSize="1.5rem"
                        mb="0.6rem"
                    >
                        Giảm giá (%)
                    </FormLabel>
                    <InputNumber
                        min={0}
                        max={100}
                        disabled
                        style={{
                            width: '200px',
                            height: '40px',
                            color: '#000',
                        }}
                        value={sale}
                    />
                </FormControl>

                <FormControl
                    id="branch"
                    mb="0.5rem"
                >
                    <FormLabel
                        fontSize="1.5rem"
                        mb="0.6rem"
                    >
                        Ảnh
                    </FormLabel>

                    {imagePreview && (
                        <Image
                            src={imagePreview}
                            alt=""
                            preview={false}
                            style={{ height: '260px' }}
                        />
                    )}
                </FormControl>
                {otherImage.length > 0 && (
                    <FormControl
                        id="branch"
                        mb="0.5rem"
                    >
                        <FormLabel
                            fontSize="1.5rem"
                            mb="0.6rem"
                        >
                            Hình ảnh khác
                        </FormLabel>

                        <Flex
                            gap="20px"
                            flexWrap="wrap"
                        >
                            {otherImage.map((image: any) => {
                                return (
                                    <Image
                                        src={image.image_product}
                                        alt=""
                                        key={image.id}
                                        preview={false}
                                        style={{ height: '120px' }}
                                    />
                                );
                            })}
                        </Flex>
                    </FormControl>
                )}
                <FormControl
                    id="branch"
                    mb="0.5rem"
                >
                    <FormLabel
                        fontSize="1.5rem"
                        mb="0.6rem"
                    >
                        Mô tả
                    </FormLabel>

                    <Box style={{ padding: '1rem' }}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: description ?? '',
                            }}
                        />
                    </Box>
                </FormControl>
                <FormControl
                    id="branch"
                    mb="0.5rem"
                >
                    <FormLabel
                        fontSize="1.5rem"
                        mb="0.6rem"
                        mt="2rem"
                    >
                        Xếp hạng (⭐)
                    </FormLabel>
                    <InputNumber
                        min={0}
                        max={5}
                        disabled
                        value={rate}
                        style={{
                            width: '200px',
                            height: '40px',
                            color: '#000',
                        }}
                    />
                </FormControl>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mb="0.6rem"
                    >
                        Danh mục
                    </FormLabel>
                    <Select
                        height="4rem"
                        fontSize="1.4rem"
                        mb="0.6rem"
                        color="#000"
                        isReadOnly
                        isDisabled
                        value={categoryId}
                        placeholder="Select categories"
                    >
                        {categories.map((category: ICategoryGet) => (
                            <option
                                key={category.id}
                                value={`${category.id}`}
                            >{`${category.name_categories}`}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.6rem"
                        mb="1rem"
                    >
                        Bình luận
                    </FormLabel>
                    {comments.length > 0 ? (
                        comments.map((comment: ICommentGet) => (
                            <CommentItem
                                data={comment}
                                key={comment.id}
                            />
                        ))
                    ) : (
                        <Heading fontSize="1.6rem" p="10px" textAlign="center">Không có bình luận nào !</Heading>
                    )}
                </FormControl>
            </Stack>
        </Style.Wrapper>
    );
};

const Style = {
    Wrapper: styled.div`
        .ck-editor__editable:not(.ck-editor__nested-editable) {
            min-height: 200px;
        }
    `,
};
const StyleCom = {
    CommentItem: styled.div`
        display: flex;
        gap: 2rem;
        border-bottom: 1px solid #ccc;
        margin-bottom: 1rem;
        padding: 0.5rem 5rem 0.5rem 0.6rem;
        position: relative;
    `,
    Avatar: styled.div`
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        overflow: hidden;
        flex-shrink: 0;
    `,

    Comment: styled.div`
        h3 {
            margin-bottom: 0.4rem;
        }
        .time {
            color: #888;
            font-size: 1.2rem;
            margin-bottom: 0.6rem;
        }
    `,

    Trash: styled.div`
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    `,
};
export default FormView;
