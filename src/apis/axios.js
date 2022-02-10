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

  // 접수 리스트
  getReception: () => instance.get('api/sell/master/'),
  // 접수 추가
  createReception: (contents) => instance.post('api/sell/master/', contents),
  // 접수 수정
  patchReception: (seq_id, contents) => instance.patch(`api/sell/master/${seq_id}/`, contents),
  // 접수 삭제
  deleteReception: (seq_id) => instance.delete(`api/sell/master/${seq_id}/`),
  // 해당 거래처의 파트명 불러오기
  getVendorPart: (vendor_seq_id) => instance.get(`api/sell/price/${vendor_seq_id}/`),
  // 접수 리스트 단가 추가
  createReceptionPrice: (contents) => instance.post('/sell/detail/', contents),


  // 파트 불러오기
  getPart: () => instance.get('api/code/part/'),
  // 파트 추가
  createPart: (contents) => instance.post('api/code/part/', contents),
  // 파트 수정
  patchPart: (seq_id, contents) => instance.patch(`api/code/part/${seq_id}/`, contents),
  // 파트 삭제
  deletePart: (seq_id) => instance.delete(`api/code/part/${seq_id}/`),


  // 장치 불러오기
  getItem: () => instance.get('api/code/item/'),
  // 장치 추가
  createItem: (contents) => instance.post('api/code/item/', contents),
  // 장치 수정
  patchItem: (seq_id, contents) => instance.patch(`api/code/item/${seq_id}/`, contents),
  // 장치 삭제
  deleteItem: (seq_id) => instance.delete(`api/code/item/${seq_id}/`),


  // 치과 불러오기
  getDental: () => instance.get('api/vendor/'),
  // 치과 추가
  createDental: (contents) => instance.post('api/vendor/', contents),
  // 치과 수정
  patchDental: (seq_id, contents) => instance.patch(`api/vendor/${seq_id}/`, contents),
  // 치과 삭제
  deleteDental: (seq_id) => instance.delete(`api/vendor/${seq_id}/`),


  // 단가 불러오기
  getPrice: () => instance.get('api/sell/price/'),
  // 단가 추가
  createPrice: (contents) => instance.post('api/sell/price/', contents),
  // 단가 수정
  patchPrice: (seq_id, contents) => instance.patch(`api/sell/price/${seq_id}/`, contents),
  // 단가 삭제
  deletePrice: (seq_id) => instance.delete(`api/sell/price/${seq_id}/`),

  
  // 업태 불러오기
  getBusinessType: () => instance.get('api/code/businessType/'),
  // 업종 불러오기
  getBusinessSector: () => instance.get('api/code/businessSector/'),
  // 치과 불러오기
  getBank: () => instance.get('api/code/bank/'),

};
