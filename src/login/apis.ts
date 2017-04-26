export const getAuthToken = (login, password) => new Promise<string>((res, rej) => {
        setTimeout(() => {
            if (login === 'admin' && password === 'admin'){
                res(Math.random().toString());
            } else {
                rej();
            }
        }, Math.random() * 4000 + 1000);
});