import { Alert } from 'react-native';
import { ApiEndPoints } from './ApiEndPoints';
import { HttpClient } from './HttpClient'

export class UserController {

    static login(params, cancelToken) {
        return new Promise((resolve, reject) => {
            HttpClient.post(ApiEndPoints.LOGIN, params, { cancelToken: cancelToken })
                .then(response => {
                    // if (!response.isVerified) {
                    //     Alert.alert('Info', strings.common.verifyEmail,
                    //         [{ text: 'Cancel', onPress: () => console.log('cancelled') },
                    //         { text: 'Resend', onPress: () => this.resendVerificationLink(params) }])
                    //     reject()
                    //     return
                    // }
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
        });
    }

    static deleteAccount(params, cancelToken) {
        return new Promise((resolve, reject) => {
            HttpClient.post(ApiEndPoints.DELETEACCOUNT, params, { cancelToken: cancelToken })
                .then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
        });
    }

    static forgotpassword(params, cancelToken) {
        return new Promise((resolve, reject) => {
            HttpClient.post(ApiEndPoints.FORGOTPASSWORD, params, { cancelToken: cancelToken })
                .then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
        });
    }

    static verifyOtp(params, cancelToken) {
        return new Promise((resolve, reject) => {
            HttpClient.post(ApiEndPoints.VERIFYOTP, params, { cancelToken: cancelToken })
                .then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
        });
    }

    static verifyUser(params, cancelToken) {
        return new Promise((resolve, reject) => {
            HttpClient.post(ApiEndPoints.VERIFYUSER, params, { cancelToken: cancelToken })
                .then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
        });
    }

    static createNewPassword(params, cancelToken) {
        return new Promise((resolve, reject) => {
            HttpClient.post(ApiEndPoints.CREATENEWPASSWORD, params)
                .then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
        });
    }

    static resendOtp(params, cancelToken) {
        return new Promise((resolve, reject) => {
            HttpClient.post(ApiEndPoints.RESENDOTP, params, { cancelToken: cancelToken })
                .then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
        });
    }
    //

    static logout() {
        return new Promise((resolve) => {
            resolve();
        });
    }

    static signUp(params, cancelToken){
        return new Promise((resolve, reject) => {
            HttpClient.post(ApiEndPoints.SIGNUP, params,{ cancelToken: cancelToken })
                .then(response => {
                    resolve(response);
                }).catch(e => {
                    reject(e);
                })
        });
    }

    static socialLogin(params){
        return new Promise ((resolve, reject) => {
            HttpClient.post(ApiEndPoints.SOCIALLOGIN, params)
            .then(response => {
                resolve(response);
            }).catch(e => {
                reject(e);
            })
        });
    }
}
