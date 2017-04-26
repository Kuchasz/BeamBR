export const getAuthToken = (login, password) => new Promise((res, rej) => {
        setTimeout(() => {
            if (login === 'admin' && password === 'admin'){
                res(Math.random());
            } else {
                rej();
            }
        }, Math.random() * 4000 + 1000);
});