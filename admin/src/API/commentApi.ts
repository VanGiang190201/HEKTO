import { instanceRequest } from './axiosClient';


export interface ICommentGet {
    id: number;
    product_id: number;
    user_id: number;
    avatar: string;
    time_comment: string;
    display_name: string;
    comment: string;
}

const url = '/comments';

const commentsApi = {

    getComments(id:number) {
        return instanceRequest({
            url : `${url}?product_id=${id}`,
            method: 'GET',
        });
    },

    deleteComment(id: number) {
        return instanceRequest({
             url : `${url}/${id}`,
             method : 'DELETE'
        });
    },
};

export default commentsApi;
