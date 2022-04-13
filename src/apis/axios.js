import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'x-CSRFToken';
axios.defaults.withCredentials = true

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: 'http://localhost:8000/api',
  withCredentials: false,
  
  // headers: {
  //   'content-type': 'application/json;charset=UTF-8',
  //   accept: 'application/json',
  // },
});

export const apis = {

  // 접수 불러오기
  getReception: () => instance.get('/sell/master/'),
  // 접수 추가
  createReception: (contents) => instance.post('/sell/master/', contents),
  // 접수 수정
  patchReception: (seqId, contents) => instance.patch(`/sell/master/${seqId}/`, contents),
  // 접수 삭제
  deleteReception: (seqId) => instance.delete(`/sell/master/${seqId}/`),
  // 접수 디테일 불러오기
  getReceptionDetail: () => instance.get('/sell/detail/'),
  // 접수 디테일 선택 불러오기
  getReceptionDetailSelect: (seqId) => instance.get(`/sell/master/${seqId}/details/`),
  // 접수 디테일 단가 추가
  createReceptionPrice: (contents) => instance.post('/sell/detail/', contents),
  // 접수 디테일 단가 수정
  //patchReceptionDetail: (seq_id, contents) => instance.patch(`api/sell/detail/${seq_id}/`, contents),
  // 접수 디테일 단가 삭제
  deleteReceptionDetail: (seqId) => instance.delete(`/sell/detail/${seqId}/`),


  // 파트 불러오기
  getPart: () => instance.get('/code/part/'),
  // 파트 추가
  createPart: (contents) => instance.post('/code/part/', contents),
  // 파트 수정
  patchPart: (seqId, contents) => instance.patch(`/code/part/${seqId}/`, contents),
  // 파트 삭제
  deletePart: (seqId) => instance.delete(`/code/part/${seqId}/`),


  // 장치 불러오기
  getItem: () => instance.get('/code/item/'),
  // 장치 추가
  createItem: (contents) => instance.post('/code/item/', contents),
  // 장치 수정
  patchItem: (seqId, contents) => instance.patch(`/code/item/${seqId}/`, contents),
  // 장치 삭제
  deleteItem: (seqId) => instance.delete(`/code/item/${seqId}/`),
  // 장치 검색
  //searchItem: (contents) => instance.get('api/item/', contents),


  // 치과 불러오기
  getDental: () => instance.get('/vendor/'),
  // 선택한 거래처의 파트명 불러오기
  getSelectVendorPart: (vendorSeqId) => instance.get(`/vendor/${vendorSeqId}/price/`),
  // 치과 추가
  createDental: (contents) => instance.post('/vendor/', contents),
  // 치과 수정
  patchDental: (seqId, contents) => instance.patch(`/vendor/${seqId}/`, contents),
  // 치과 삭제
  deleteDental: (seqId) => instance.delete(`/vendor/${seqId}/`),


  // 단가 불러오기
  getPrice: () => instance.get('/sell/price/'),
  // 단가 추가
  createPrice: (contents) => instance.post('/sell/price/', contents),
  // 단가 수정
  patchPrice: (seqId, contents) => instance.patch(`/sell/price/${seqId}/`, contents),
  // 단가 삭제
  deletePrice: (seqId) => instance.delete(`/sell/price/${seqId}/`),

  
  // 업태 불러오기
  getBusinessType: () => instance.get('/code/businessType/'),
  // 업종 불러오기
  getBusinessSector: () => instance.get('/code/businessSector/'),
  // 치과 불러오기
  getBank: () => instance.get('/code/bank/'),


  // 로그인
  login: (contents) => instance.post('/users/login/', contents),
  // 회원가입
  userRegister: (contents) => instance.post('/users/user/', contents),


  // 접수 리스트 검색
  receptionSearch: (contents) => instance.get('/sell/master/', contents),
  // 파트 검색
  partSearch: (contents) => instance.get('/code/part/', contents),
  // 장치 검색
  itemSearch: (contents) => instance.get('/code/item/', contents),
  // 치과 검색
  dentalSearch: (contents) => instance.get('/vendor/', contents),
  // 단가 검색
  priceSearch: (contents) => instance.get('/sell/price/', contents),


  // 거래처에 해당하는 단가
  vendorSelectPrice: (vendorSeqId) => instance.get(`/vendor/${vendorSeqId}/price/`),
  
  // PDF report 코드 가져오기
  getReportCode: () => instance.get('/code/report/'),
  // PDF 출력
  reportPrint: (reportSeqId, contents) => instance.get(`/sell/report/${reportSeqId}`, contents),


  


};
