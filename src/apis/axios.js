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
  getPost: () => instance.get('api/code/part/'),
  // 게시물 작성하기
  createPost: (contents) => instance.post('api/code/part/', contents),
  // 게시물 수정하기
  editPost: (id, content) => instance.put(`/posts/${id}`, content),
  // 게시물 삭제하기
  delPost: (id) => instance.delete(`/posts/${id}`),
};
