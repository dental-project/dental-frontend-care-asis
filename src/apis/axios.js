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
  // 파트 불러오기
  getPart: () => instance.get('api/code/part/'),
  // 파트 추가
  createPart: (contents) => instance.post('api/code/part/', contents),
  // 게시물 수정
  patchPart: (seq_id, contents) => instance.patch(`api/code/part/${seq_id}/`, contents),
  // 게시물 삭제
  deletePart: (seq_id) => instance.delete(`api/code/part/${seq_id}/`),

  
  getItem: () => instance.get('api/code/item/'),

  createItem: (contents) => instance.post('api/code/item/', contents),

  patchPart: (seq_id, contents) => instance.patch(`api/code/item/${seq_id}/`, contents),

  deleteItem: (seq_id) => instance.delete(`api/code/item/${seq_id}/`),

};
