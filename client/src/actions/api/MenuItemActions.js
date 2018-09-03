import Api from 'actions/Api';

class MenuItemApi extends Api {
    createMenuItem(menuItem) {
        return this.post('', menuItem);
    }

    updateMenuItem(id, menuItem) {
        return this.post(`/${id}`, menuItem);
    }

    getMenuItem(id) {
        return this.get(`/${id}`);
    }
}

export default new MenuItemApi('MENU_ITEM_API', 'api/menuItem');
