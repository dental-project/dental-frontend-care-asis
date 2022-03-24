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

  // 접수 불러오기
  getReception: () => instance.get('api/sell/master/'),
  // 접수 추가
  createReception: (contents) => instance.post('api/sell/master/', contents),
  // 접수 수정
  patchReception: (seqId, contents) => instance.patch(`api/sell/master/${seqId}/`, contents),
  // 접수 삭제
  deleteReception: (seqId) => instance.delete(`api/sell/master/${seqId}/`),
  // 접수 디테일 불러오기
  getReceptionDetail: () => instance.get('api/sell/detail/'),
  // 접수 디테일 선택 불러오기
  getReceptionDetailSelect: (seqId) => instance.get(`api/sell/master/${seqId}/details/`),
  // 접수 디테일 단가 추가
  createReceptionPrice: (contents) => instance.post('api/sell/detail/', contents),
  // 접수 디테일 단가 수정
  //patchReceptionDetail: (seq_id, contents) => instance.patch(`api/sell/detail/${seq_id}/`, contents),
  // 접수 디테일 단가 삭제
  deleteReceptionDetail: (seqId) => instance.delete(`api/sell/detail/${seqId}/`),


  // 파트 불러오기
  getPart: () => instance.get('api/code/part/'),
  // 파트 추가
  createPart: (contents) => instance.post('api/code/part/', contents),
  // 파트 수정
  patchPart: (seqId, contents) => instance.patch(`api/code/part/${seqId}/`, contents),
  // 파트 삭제
  deletePart: (seqId) => instance.delete(`api/code/part/${seqId}/`),


  // 장치 불러오기
  getItem: () => instance.get('api/code/item/'),
  // 장치 추가
  createItem: (contents) => instance.post('api/code/item/', contents),
  // 장치 수정
  patchItem: (seqId, contents) => instance.patch(`api/code/item/${seqId}/`, contents),
  // 장치 삭제
  deleteItem: (seqId) => instance.delete(`api/code/item/${seqId}/`),
  // 장치 검색
  //searchItem: (contents) => instance.get('api/item/', contents),


  // 치과 불러오기
  getDental: () => instance.get('api/vendor/'),
  // 선택한 거래처의 파트명 불러오기
  getSelectVendorPart: (vendorSeqId) => instance.get(`api/vendor/${vendorSeqId}/price/`),
  // 치과 추가
  createDental: (contents) => instance.post('api/vendor/', contents),
  // 치과 수정
  patchDental: (seqId, contents) => instance.patch(`api/vendor/${seqId}/`, contents),
  // 치과 삭제
  deleteDental: (seqId) => instance.delete(`api/vendor/${seqId}/`),


  // 단가 불러오기
  getPrice: () => instance.get('api/sell/price/'),
  // 단가 추가
  createPrice: (contents) => instance.post('api/sell/price/', contents),
  // 단가 수정
  patchPrice: (seqId, contents) => instance.patch(`api/sell/price/${seqId}/`, contents),
  // 단가 삭제
  deletePrice: (seqId) => instance.delete(`api/sell/price/${seqId}/`),

  
  // 업태 불러오기
  getBusinessType: () => instance.get('api/code/businessType/'),
  // 업종 불러오기
  getBusinessSector: () => instance.get('api/code/businessSector/'),
  // 치과 불러오기
  getBank: () => instance.get('api/code/bank/'),

};
