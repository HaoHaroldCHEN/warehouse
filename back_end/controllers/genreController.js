//load json to object
var fs=require('fs');
var file="public/json/noelleeming-catalog.json";
var result=JSON.parse(fs.readFileSync(file));

//index controller
exports.index = (req, res) => { 
    var page = 1;
    if (req.query.key) {
        //key search
        page =req.query.p;
        var key_arr_pro = Array();
        result.forEach(element => {
            if (element.name.toUpperCase().indexOf(req.query.key.toUpperCase()) != -1) {
                key_arr_pro.push(element);
            }
        });
        res.json({status:200,msg:'OK',key:req.query.key,total_page:Math.ceil(key_arr_pro.length/12),current_page:parseInt(page),data:key_arr_pro.slice((page - 1) * 12 , page * 12)});
    } else if (req.query.p && req.query.cate) {
        //catrgory list
        page =req.query.p;
        var cate_arr_pro = Array();
        result.forEach(element => {
            if (decodeURIComponent(req.query.cate) == element.categories) {
                cate_arr_pro.push(element);
            }
        });
        res.json({status:200,msg:'OK',cate:req.query.cate,total_page:Math.ceil(cate_arr_pro.length/12),current_page:parseInt(page),data:cate_arr_pro.slice((page - 1) * 12 , page * 12)});
    } else if (req.query.p) {
        //all product list
        page =req.query.p;
        res.json({status:200,msg:'OK',total_page:Math.ceil(result.length/12),current_page:parseInt(page),data:result.slice((page - 1) * 12 , page * 12)});
    }

    
};
//category api
exports.cateList = (req, res) => { 
    var cate_arr = Array();
    result.forEach(element => {
        if (cate_arr.indexOf(element.categories) == -1) {
            cate_arr.push(element.categories);
        }
    });
    res.json({status:200,msg:'OK',data:cate_arr.slice(0,20)});
};
//cart api
exports.cartQuery = (req, res) => { 
    result.forEach(element => {
        if (decodeURIComponent(req.query.sku) == element.sku) {
            res.json({status:200,msg:'OK',data:element});
        }
    });
    
}