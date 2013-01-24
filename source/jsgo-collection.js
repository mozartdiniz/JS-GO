/**
 * A collection ready to contain only generic objects childs
 *
 * @author Rubens Pinheiro Gonçalves Cavalcante
 * @email rubenspgcavalcante@gmail.com
 * @since jan 2013
 * @version 0.1b
 *
 */
 
/*
 * A collection of GenericObjects childs
 * @constructor
 */
GenericObjectCollection = function(){
    this.objects = [];
};


GenericObjectCollection.prototype.add = function(object){
    if(object.header.GenericObject){
        this.objects.push(object);
    }
};


/**
 * Private method to search object(s) into collection
 * @private
 * @param {string} attr The attribute where search
 * @param value to search
 * @param {boolean} unique If unique is true, stops in the first match
 * @return {Object|Array<Object>} The indexes and objects founds
 *
 */
GenericObjectCollection.prototype._find = function(attr, value, unique){
    var response = [];
    for(index in this.objects){
        if(typeof(this.objects[index][attr]) != "undefined" && this.objects[index][attr].get() == value){
            var match = {index: index, object: this.objects[index]};

            if(unique){
                return match;
            }
            else{
                response.push(match);
            }
        }
    }
    if(response.length == 0){
        return null;
    }
    else{
        return response;
    }
};


/**
 * Find objects
 * 
 * @param {string} attr Atribute name do search into objects
 * @param value The value to search
 * @return {Array<Object>} The objects matches
 */
GenericObjectCollection.prototype.find = function(attr, value){
    var result = this._find(attr, value, false)
    var objects = [];

    for(i in result){
        objects.push(result[i].object);
    }

    return objects;
};


/**
 * Find a object
 * 
 * @param {string} attr Atribute name do search into objects
 * @param value The value to search
 * @return {Object} The first object that matches
 */
GenericObjectCollection.prototype.findUnique = function(attr, value){
    var response = this._find(attr, value, true);
    return (response == null)? null : response.object;
};


/**
 * As the findUnique method, but returns the index of the first object that matches
 * 
 * @param {string} attr Atribute name do search into objects
 * @param value The value to search
 * @return {number} The index of the object or -1 if not found
 */
GenericObjectCollection.prototype.indexesOf = function(attr, value){
        var result = this._find(attr, value, false)
    var indexes = [];

    for(i in result){
        indexes.push(result[i].index);
    }

    return indexes;
};


/**
 * As the findUnique method, but returns the index of the first object that matches
 * 
 * @param {string} attr Atribute name do search into objects
 * @param value The value to search
 * @return {number} The index of the object or -1 if not found
 */
GenericObjectCollection.prototype.indexOf = function(attr, value){
    var result = this._find(attr, value, true).index;
    if(result != null){
        return result;
    }
    else{
        return -1;
    }
};

/**
 * Removes the first ocurrence that matchs
 * 
 * @param {string} attr Atribute name do search into objects
 * @param value The value to search
 * @return {boolean} If removed
 */
GenericObjectCollection.prototype.remove = function(attr, value){
    var res = this._find(attr, value, true);
    
    if(res != null){
        this.objects.splice(res.index, 1);
        return true;
    }
    else{
        return false;
    }
};

/**
 * Transforms into a list of pure structures
 * 
 * @return {Array<Object>}
 */
GenericObjectCollection.prototype.toObjects = function(){
    var structures = [];
    for(i in this.objects){
        structures.push(this.objects[i].toObject());
    }

    return structures;
};


/**
 * Sorts the collection
 * 
 * @param {string} attribute Wich attribute to use as key in sorting
 * @param {string} order Define if ascending sort. Default "asc"
 */
GenericObjectCollection.prototype.sort = function(attribute, order){
    if(typeof(order) == "undefined" || order != "desc"){
        order = "asc";
    }
    this.objects.sort(function(a, b){
        a = a[attribute].get();
        b = b[attribute].get();

        return order == "asc" ? a > b : a < b;
    });
};


/**
 * Prints into console into a pretty format
 */
GenericObjectCollection.prototype.prettyPrint = function(){
    var print = "";
    var list = this.toObjects();
    for(i in list){
        print += "index: " + i + " Class: " + list[i].header.className + "\n";
        for(j in list[i]){
            print += "\t" + j + ": " + list[i][j] +"\n";
        }
        print += "\n\n";
    }
    console.log(print);
};