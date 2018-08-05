import Api from 'actions/Api';

class MenuApi extends Api {
    getMenu() {
        return this.get();
    }
}

export default MenuApi('MENU_API', 'api/menu');
