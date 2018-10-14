'use strict'

var gTrans = {
    header:{
        en: 'Book Shop',
        he: 'חנות ספרים',
    },

    id: {
        en: 'Id',
        he: 'מספר סידורי',
    },
    title: {
        en: 'Title',
        he: 'כותר',
    },
    price: {
        en: 'Price',
        he: 'מחיר',
    },
    rate: {
        en: 'Rate',
        he: 'דירוג',
    },
    actions: {
        en: 'Actions',
        he: 'פעולות',
    },
    read: {
        en: 'Read',
        he: 'קרא',
    },
    update: {
        en: 'Update',
        he: 'עדכן',
    },
    delete: {
        en: 'Delete',
        he: 'מחק',
    },
    add: {
        en: 'Add New',
        he: 'הוסף ספר',
    },
    sure: {
        en: 'Are you sure you want to delete?',
        he: 'האם אתה בטוח שברצונך למחוק?',
    },
    updatePrice: {
        en: 'Enter price',
        he: ' הכנס מחיר ',
    },
    saveAndClose: {
        en: 'Save and close',
        he: 'שמור שינויים',
    },
    addNew: {
        en: 'Add New Book',
        he: 'הוסף ספר חדש',
    },
    prev: {
        en: 'Previous',
        he: 'הקודם',
    },
    next: {
        en: 'Next',
        he: 'הבא',
    },
    imgUrl: {
        en: 'Img Url',
        he: 'קישור לתמונה',
    },

    rateAlert:{
        en: 'Enter number between 0-10',
        he: 'הכנס מספר בין 1 ל10', 
    },

    priceAlert:{
        en: 'Please enter a number',
        he: 'נא הכנס מספר', 
    }
   
   
}

var gCurrLang = 'en';

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.getAttribute('data-trans');
        
        var txt = getTrans(transKey);

        // switch ( el.classList[0]) {
        //     case 'input-add-title':
        //     txt ='שם הספר';
        //     break;
        //     case 'input-add-price':
        //     txt='מספרים בלבד';
        //     break;
        // }
        el.innerHTML = txt;
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
    if (gCurrLang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    doTrans();
}