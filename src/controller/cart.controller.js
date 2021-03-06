const {createOrUpdate, findCarts, updateCarts} = require('../service/cart.service')
const {cartFormatError} = require('../constant/err.type')

class CartController {
    async add(ctx) {
        const user_id = ctx.state.user.id
        const {goods_id} = ctx.request.body

        const res = await createOrUpdate(user_id, goods_id)

        ctx.body = {
            code: 0,
            message: '添加到购物车成功',
            result: res
        }
    }

    async findAll(ctx) {
        const {pageNum = 1, pageSize = 10} = ctx.request.query
        const res = await findCarts(pageNum, pageSize)

        ctx.body = {
            code: 0,
            message: '获取购物车列表成功',
            result: res
        }
    }

    async update(ctx) {
        const {id} = ctx.request.params
        const {number, selected} = ctx.request.body

        if (number === undefined && selected === undefined) {
            cartFormatError.message = 'number和selected不能同时为空'
            return ctx.app.emit('error', cartFormatError, ctx)
        }

        const res = await updateCarts({id, number, selected})

        ctx.body = {
            code: 0,
            message: '更新购物车成功',
            result: res
        }
    }
}

module.exports = new CartController()
