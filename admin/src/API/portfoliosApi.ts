import { instanceRequest } from './axiosClient';

export interface IPortfoliosCreate {
    name_portfolios : string;
    description_portfolios : string;
}

export interface IPortfoliosGet {
    id: number;
    name_portfolios : string;
    description_portfolios : string;
}

export interface IPortfoliosPatch {
    name_portfolios : string;
    description_portfolios : string;
}

const url = '/portfolios';

const portfoliosApi = {
    create(body: IPortfoliosCreate) {
        return instanceRequest({
            url,
            method : 'POST',
            data : body
        });
    },

    getAllPortfolios() {
        return instanceRequest({
             url,
             method : 'GET'
        });
    },

    search(key_word : string) {
        return instanceRequest({
            url : `${url}?key_word=${key_word}`,
            method : 'GET'
        });
    },


    getPortfolio(id: number) {
        return instanceRequest({
            url : `${url}/${id}`,
            method : 'GET',
        });
    },

    editPortfolio(id: number, data: IPortfoliosPatch) {
        return instanceRequest({
             url : `${url}/${id}`,
             method : 'PATCH',
             data
        });
    },

    deletePortfolio(id: number) {
        return instanceRequest({
             url : `${url}/${id}`,
             method : 'DELETE',
        });
    },
};

export default portfoliosApi;
