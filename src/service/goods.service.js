const Goods = require('../model/goods.model')
const {where} = require("sequelize");

class GoodsService {
    async createGoods(goods) {
        const res = await Goods.create(goods)
        return res.dataValues
    }

    async updateGoods(id, goods) {
        const res = await Goods.update(goods, {where: {id}})
        return res[0] > 0 ? true : false
    }

    async removeGoods(id) {
        const res = await Goods.destroy({where: {id}})
        return res > 0 ? true : false
    }

    async restoreGoods(id) {
        const res = await Goods.restore({where: {id}})
        return res > 0 ? true : false
    }

    async findGoods(pageNum, pageSize) {
        let offset = (pageNum - 1) * pageSize
        let limit = Number(pageSize)
        // const count = await Goods.count()
        // const rows = await Goods.findAll({offset, limit})
        const {count, rows} = await Goods.findAndCountAll({
            offset,
            limit
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }
}

module.exports = new GoodsService()
