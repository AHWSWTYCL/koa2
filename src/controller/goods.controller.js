const path = require('path')
const {
    fileUploadError,
    unSupportedFileType,
    publishGoodsError,
    invalidGoods
} = require('../constant/err.type')

const {
    createGoods,
    updateGoods,
    removeGoods,
    restoreGoods,
    findGoods
} = require('../service/goods.service')

class GoodsController {
    async upload(ctx, next) {
        // console.log(ctx.request.files.file)
        const fileTypes = ['image/jpeg', 'image/png']
        const {file} = ctx.request.files
        if (file) {
            if (!fileTypes.includes(file.type)) {
                return ctx.app.emit('error', unSupportedFileType, ctx)
            }
            ctx.body = {
                code: 0,
                message: '图片上传成功',
                result: {
                    goods_img: path.basename(file.path)
                }
            }
        } else {
            return ctx.app.emit('error', fileUploadError, ctx)
        }
    }

    async create(ctx) {
        try {
            const res = await createGoods(ctx.request.body)
            ctx.body = {
                code: 0,
                message: '发布商品成功',
                result: res
            }
        } catch (err) {
            console.error(err)
            return ctx.app.emit('error', publishGoodsError, ctx)
        }
    }

    async update(ctx) {
        try {
            let res = await updateGoods(ctx.params.id, ctx.request.body)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '商品修改成功',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', invalidGoods, ctx)
            }
        } catch (err) {
            console.error(err)
        }
    }

    async remove(ctx) {
        try {
            let res = await removeGoods(ctx.params.id)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '下架商品成功',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', invalidGoods, ctx)
            }
        } catch (err) {
            console.error(err)
        }
    }

    async restore(ctx) {
        try {
            const res = await restoreGoods(ctx.params.id)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '上架商品成功',
                    result: ''
                }
            } else {
                return ctx.app.emit('error', invalidGoods, ctx)
            }
        } catch (err) {
            console.error(err)
        }
    }

    async findAll(ctx) {
        const {pageNum = 1, pageSize = 10} = ctx.request.query
        const res = await findGoods(pageNum, pageSize)
        ctx.body = {
            code: 0,
            message: '获取商品列表成功',
            result: res
        }
    }
}

module.exports = new GoodsController()
