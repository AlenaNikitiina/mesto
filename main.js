(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var t=function(){function t(e,n,o,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e,this._link=n,this._templateItem=document.querySelector(o).content,this._handlePreview=r,this._myHtmlElement=this._templateItem.querySelector(".elements__card").cloneNode(!0),this._myHtmlElement.querySelector(".element__title").textContent=e,this._fotoZoomOpen=this._myHtmlElement.querySelector(".element__foto"),this._fotoZoomOpen.src=n,this._fotoZoomOpen.alt=e,this._buttonLike=this._myHtmlElement.querySelector(".element__like"),this._trashButton=this._myHtmlElement.querySelector(".element__trash-button"),this._setListeners()}var n,o;return n=t,(o=[{key:"createCard",value:function(){return this._myHtmlElement}},{key:"_likeIt",value:function(){this._buttonLike.classList.toggle("element__like_active")}},{key:"_deletePhoto",value:function(){this._myHtmlElement.remove(),this._myHtmlElement=null}},{key:"_zoomPhoto",value:function(e){this._handlePreview(this._name,this._link)}},{key:"_setListeners",value:function(){var e=this;this._buttonLike.addEventListener("click",(function(){e._likeIt()})),this._trashButton.addEventListener("click",(function(){e._deletePhoto()})),this._fotoZoomOpen.addEventListener("click",(function(){e._handlePreview(e._name,e._link)}))}}])&&e(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var o=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._selectorsSetting=t,this.formToValid=n}var t,o;return t=e,(o=[{key:"enableValidation",value:function(){this._setEventListeners()}},{key:"_showInputError",value:function(e,t){var n=this.formToValid.querySelector(".".concat(e.id,"-error"));e.classList.add(this._selectorsSetting.inputErrorClass),n.textContent=t,n.classList.add(this._selectorsSetting.inputErrorClassActiv)}},{key:"_hideInputError",value:function(e){var t=this.formToValid.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._selectorsSetting.inputErrorClass),t.classList.remove(this._selectorsSetting.inputErrorClassActiv),t.textContent=""}},{key:"_isValid",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.disabled=!0,this._buttonElement.classList.add(this._selectorsSetting.buttonElementInactiv)):(this._buttonElement.disabled=!1,this._buttonElement.classList.remove(this._selectorsSetting.buttonElementInactiv))}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_setEventListeners",value:function(){var e=this;this._inputList=Array.from(this.formToValid.querySelectorAll(this._selectorsSetting.inputSelector)),this._buttonElement=this.formToValid.querySelector(this._selectorsSetting.submitButtonSelector),this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._isValid(t),e._toggleButtonState()}))}))}},{key:"removeValidationErrors",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){e._hideInputError(t)}))}}])&&n(t.prototype,o),Object.defineProperty(t,"prototype",{writable:!1}),e}();function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i=function(){function e(t,n){var o=t.items,r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=o,this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"rendererAllItems",value:function(){var e=this;this._renderedItems.forEach((function(t){e._renderer(t)}))}},{key:"addItem",value:function(e,t){t?this._container.append(e):this._container.prepend(e)}}])&&r(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var c=function(){function e(t){var n=t.nameSelector,o=t.aboutInfoSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=document.querySelector(n),this._userAboutInfo=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{profileName:this._userName.textContent,profileAboutInfo:this._userAboutInfo.textContent}}},{key:"setUserInfo",value:function(e,t){this._userName.textContent=e,this._userAboutInfo.textContent=t}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"setEventListeners",value:function(){var e=this;this._popup.querySelector(".popup__close-button").addEventListener("click",(function(){e.close()})),this._popup.addEventListener("mousedown",(function(t){t.target===t.currentTarget&&e.close()}))}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}function p(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function f(){return f="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var o=y(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(arguments.length<3?e:n):r.value}},f.apply(this,arguments)}function y(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_(e)););return e}function d(e,t){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},d(e,t)}function m(e,t){if(t&&("object"===a(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function _(e){return _=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},_(e)}var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(u,e);var t,n,o,r,i=(o=u,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=_(o);if(r){var n=_(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return m(this,e)});function u(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,e))._callbackSubmitForm=t,n._formInputs=Array.from(n._popup.querySelectorAll(".form__input")),n._popupForm=n._popup.querySelector(".popup__form"),n}return t=u,(n=[{key:"_getInputValues",value:function(){var e={};return this._formInputs.forEach((function(t){e[t.id]=t.value})),e}},{key:"setEventListeners",value:function(){f(_(u.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",this._submit.bind(this))}},{key:"_submit",value:function(e){e.preventDefault(),this._callbackSubmitForm(this._getInputValues()),this.close()}},{key:"close",value:function(){f(_(u.prototype),"close",this).call(this),this._popupForm.reset()}}])&&p(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(s);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function b(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function g(){return g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var o=S(e,t);if(o){var r=Object.getOwnPropertyDescriptor(o,t);return r.get?r.get.call(arguments.length<3?e:n):r.value}},g.apply(this,arguments)}function S(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=w(e)););return e}function k(e,t){return k=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},k(e,t)}function E(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function w(e){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},w(e)}var O=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&k(e,t)}(u,e);var t,n,o,r,i=(o=u,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=w(o);if(r){var n=w(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return E(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._imgLink=t._popup.querySelector(".popup__image"),t._imgFigcaption=t._popup.querySelector(".popup__figcaption"),t}return t=u,(n=[{key:"open",value:function(e,t){g(w(u.prototype),"open",this).call(this),this._imgLink.src=t,this._imgLink.alt=e,this._imgFigcaption.textContent=e}}])&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(s),j=document.querySelector(".form__edit"),I=document.querySelector(".form__add"),L=(document.querySelector(".popup_edit"),document.querySelector(".popup_add"),document.querySelector(".popup_zoom"),document.querySelectorAll(".popup"),document.querySelector(".nameInput")),q=document.querySelector(".jobInput"),P=(document.querySelector(".titleInput"),document.querySelector(".linkInput"),document.querySelector(".titleName"),document.querySelector(".titleJob"),document.querySelector(".profile__edit-button")),C=document.querySelector(".profile__add-button"),x=(document.querySelectorAll(".popup__close-button"),document.querySelector(".elements__list"),document.querySelector(".element-template").content,document.querySelector(".popup__image"),document.querySelector(".popup__figcaption"),document.querySelector(".form__input"),{formSelector:".popup__form",inputSelector:".form__input",inputErrorClass:"form__input_type_error",inputErrorClassActiv:"form__input-error_active",submitButtonSelector:".form__submit",buttonElementInactiv:"form__submit_inactive"});function R(e,n){return new t(e,n,".element-template",A).createCard()}P.addEventListener("click",(function(){H.open();var e=F.getUserInfo();L.value=e.profileName,q.value=e.profileAboutInfo,V.removeValidationErrors()})),C.addEventListener("click",(function(){N.open(),B.removeValidationErrors()}));var T=new O(".popup_zoom");function A(e,t){T.open(e,t)}T.setEventListeners();var V=new o(x,j),B=new o(x,I);V.enableValidation(),B.enableValidation();var H=new h(".popup_edit",(function(e){F.setUserInfo(e.nickName,e.about)})),N=new h(".popup_add",(function(e){var t,n;t=e.title,n=e.link,D.addItem(R(t,n),!1)}));H.setEventListeners(),N.setEventListeners();var F=new c({nameSelector:".profile__name",aboutInfoSelector:".profile__job"}),D=new i({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){D.addItem(R(e.name,e.link),!0)}},".elements__list");D.rendererAllItems()})();
//# sourceMappingURL=main.js.map