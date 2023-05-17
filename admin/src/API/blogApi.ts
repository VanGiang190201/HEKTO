import { instanceRequest } from './axiosClient';


export interface IBlogGet {
    id: number;
    title_blog: string;
    author_blog: string;
    time_release: string;
    image_blog : string;
    description_blog : string;
}

const url = '/blogs';

const blogApi = {
    create(body: any) {
        return instanceRequest({
            url,
            method: 'POST',
            data: body,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    getBlogs() {
        return instanceRequest({
            url,
            method: 'GET',
        });
    },

    search(key_word : string) {
        return instanceRequest({
            url : `${url}?key_word=${key_word}`,
            method : 'GET'
        });
    },

    getDetail(id: number) {
        return instanceRequest({
            url: `${url}/${id}`,
            method: 'GET',
        });
    },

    editBlog(id: number, body: any) {
        return instanceRequest({
            url: `${url}/${id}`,
            method: 'PATCH',
            data: body,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    deleteBlog(id: number) {
        return instanceRequest({
            url: `${url}/${id}`,
            method: 'DELETE',
        });
    },
};

export default blogApi;
