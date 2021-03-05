/* 
 * @description:独立封装 Store 状态管理 
 * @params: {}
 * @author: Javi
 */
var store

// 实时更新
export const stateModule = () => {
    store = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : []
}
stateModule();

export const store_Minx_item = (StoreType, id) => {
    var data = {
        value: [],
        key: 0
    };
    store.map((e) => {
        switch (StoreType) {
            case 0:
                if (Number(id) === Number(e.id)) data.value = e;
                break;
            case 1:
                if (Number(id) != Number(e.id)) data.value.push(e)
                break;
            case 2:
                if (e.status === 0) data.value.push(e)
                break;
            case 3:
                let time = new Date().getTime(); //当前时间
                let eTime = e.endTime
                if (eTime - time <= 0) {
                    e.status = 2
                    data.value.push(e)
                } else {
                    data.value.push(e)
                }
                break;

        }

    })
    return data;
}

// 列表
export const getStoreList = () => {
    localStorage.setItem('list', JSON.stringify(store_Minx_item(3).value))
    return store
}
// 详情
export const getStoreDetails = (id) => {
    try {
        const item = store_Minx_item(0, id);
        return item.value;
    } catch (error) {
        return [];
    }
}
// 标记已完成
export const setStoreStatus = (id) => {
    try {
        let item = store_Minx_item(0, id).value;
        item.do = true
        item.status = 1
        if (setStoreDetails(item, 1)) {
            stateModule();
            return true;
        }
    } catch (error) {
        throw 'Handle Do Failed'
    }
}
// 修改
export const setStoreDetails = (params, type) => {
    try {
        let data = store
        // type 0:新增
        if (type === 0) {
            data.push(params)
        } else {
            const item = store_Minx_item(0, params.id);
            data[item.key] = params
        }
        localStorage.setItem('list', JSON.stringify(data));
        stateModule();
        return true;
    } catch (error) {
        throw 'Add Failed'
    }
}
// 删除
export const removeStoreDetails = (id) => {
    var data = []
    try {
        store.map((e) => { if (Number(id) != Number(e.id)) { data.push(e) } })
        const item = store_Minx_item(1, id);
        localStorage.setItem('list', JSON.stringify(item.value))
        stateModule();
        return true;
    } catch (error) {
        throw 'Delete Failed'
    }
}