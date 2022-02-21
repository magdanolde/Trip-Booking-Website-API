class ExcursionsAPI {
    constructor() {
        this.url = "http://localhost:3000/";
    }

    loadData() {
        return this._fetch("excursions");
    }
    
    addData(data) {
    
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        return this._fetch("excursions", options);
    }
    
    _fetch(additionalPath = "", options) {
        const url = this.url +  additionalPath;
        return fetch(url, options)
            .then(resp => {
                if(resp.ok) { return resp.json(); }
                return Promise.reject(resp)
            });
        }

}




export default ExcursionsAPI;