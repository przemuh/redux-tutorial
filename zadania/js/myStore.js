/*
Zaimplementuj własny Store na bazie API, które udostępnia reduxowy Store

Store {
    getState,
    dispatch,
    subsribe
}
 */

class Store {
    constructor(reducer) {
        this.reducer = reducer;
        this.subscribers = [];
        this.state = reducer();
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        return () => this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.subscribers.forEach((cb) => cb());
    }
}

export default Store;
