import { LOGIN_SUCCESS, LOGIN_FAIL} from './actionTypes'

//status，0表示登录失败，1表示登录成功
const login  = (status) => {
  switch (status) {
    case LOGIN_SUCCESS:
      return {
        type: LOGIN_SUCCESS,
        index: 1
      }
    case LOGIN_FAIL:
      return {

      }
    default:
      return {
        type: LOGIN_FAIL,
        index: 2
      }
  }
}