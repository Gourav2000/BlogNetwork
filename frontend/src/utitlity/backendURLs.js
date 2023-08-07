export class BackendURLs {
    static BASE_URL = 'http://127.0.0.1:5000';
    static LOGIN_URL = `${BackendURLs.BASE_URL}/login`;
    static REGISTER_URL = `${BackendURLs.BASE_URL}/register`;
    static LOGOUT_URL = `${BackendURLs.BASE_URL}/logout`
    static PROFILE_INFO= `${BackendURLs.BASE_URL}/protected`
    static ADD_POST_URL = `${BackendURLs.BASE_URL}/api/posts`;
    static GET_ALL_POSTS= `${BackendURLs.BASE_URL}/api/posts`
    static UPDATE_POST= `${BackendURLs.BASE_URL}/api/posts`
    static GET_IMAGE_BY_IMAGEID = `${BackendURLs.BASE_URL}/api/image`
    static GET_POST_BY_ID = `${BackendURLs.BASE_URL}/api/posts`
    static GET_POST_BY_UID = `${BackendURLs.BASE_URL}/api/user/posts`
    static GET_USER_BY_ID = `${BackendURLs.BASE_URL}/users/`
    static GET_COMMENTS_BY_POST_ID = `${BackendURLs.BASE_URL}/api/comments`
    static ADD_COMMENT = `${BackendURLs.BASE_URL}/api/comments`
    static MICROSTRUCTURES = `${BackendURLs.BASE_URL}/api/microstructures`
  }