GenericObjectCollection.Query.prototype.Select = function(attributes){

    if(Array.isArray(attributes)){
        this.query.selection = attributes;
    }

    else{
        var args = arguments;
        this.query.selection = [];
        for(i in args){
            this.query.selection.push(args[i]);
        }
    }

    var that = this;
    var recordSelect = {};

    this.query.type = JSGO.METHOD.SELECT;
    //Call the From method of the Query object, look in jsgo-collection-query.js
    recordSelect.From = this.fromFunc;

    this.selectedAttributes = function(object){
        var result = {};
        var attributes = that.query.selection;
        for(i in attributes){
            if(attributes[i] == "*"){
                result = object.toObject();
                break;
            }

            if(typeof(attributes[i]) != "undefined"){
                result[attributes[i]] = object[attributes[i]].get();
            }

            else{
                result[attributes[i]] = null;
            }
        }

        return result;
    };
    
    return recordSelect;
};

/**
 * Order a array from a SELECT result
 *
 * @param {Array<Object>} values The values to order
 * @param {string} attribute The attribute to use as base
 * @param {string} order The order, use the enum JSGO.ORDER
 */
GenericObjectCollection.Query.prototype.__whenOrderBy = function(values, attribute, order){
    var attribute = attribute;
    if(typeof(order) == "undefined" || order != JSGO.ORDER.ASC && order != JSGO.ORDER.DESC){
        throw Error("Unrecognized order type. Use JSGO.ORDER enum");
    }

    values.sort(function(a, b){
        a = a[attribute];
        b = b[attribute];

        return order == JSGO.ORDER.ASC ? a > b : a < b;
    });
};