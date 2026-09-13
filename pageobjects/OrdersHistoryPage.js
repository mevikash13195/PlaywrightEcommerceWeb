class OrdersHistoryPage{
    constructor(page){
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.ordersIdDetails = page.locator(".col-text");
    }

    async searchOrderAndSelect(orderId){
        await this.ordersTable.waitFor();
        const count = await this.rows.count();
        for(let i=0; i<count; i++){
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if(orderId.includes(rowOrderId)){
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async getOrderId(){
        return await this.ordersIdDetails.textContent();
    }

    
}
module.exports = {OrdersHistoryPage};