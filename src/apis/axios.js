import axios from 'axios';

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: 'http://localhost:8000/',
  withCredentials: false,
  // headers: {
  //   'content-type': 'application/json;charset=UTF-8',
  //   accept: 'application/json',
  // },
});

export const apis = {
  // 게시물 불러오기
  getPart: () => instance.get('api/code/part/'),
  // 게시물 작성하기
  createPart: (contents) => instance.post('api/code/part/', contents),
  // 게시물 수정하기
  updatePart: (id, content) => instance.put(`api/code/part/${id}`, content),
  // 게시물 삭제하기
  deletePart: (rowSeqId) => instance.delete(`api/code/part/${rowSeqId}/`),
};
