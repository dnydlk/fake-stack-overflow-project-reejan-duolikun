import { REACT_APP_API_URL, api } from "./config";

const TAG_API_URL = `${REACT_APP_API_URL}/tag`;

const getTagsWithQuestionNumber = async () => {
    const respond = await api.get(`${TAG_API_URL}/getTagsWithQuestionNumber`);
    return respond.data;
};

export { getTagsWithQuestionNumber };
