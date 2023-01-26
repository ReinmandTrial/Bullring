const regionaProduct = document.querySelector('.regional-list__main-content')
if (regionaProduct) {
   const lengthPart = 6 // количество элементов в 1 части
   const regionalPaginationEl = document.querySelector('.regional-pagination')

   let data = [...regionaProduct.children] // Тут храним все `.card`, типо аналог БД, т.е исходные данные.
   let chunks = SplitParts(data) // Тут храним части. Ниже описание функции.
   // countAmountUserInRegion();
   RenderChunks(0) // Рендерим первую часть. Описание функии ниже.
   RenderPagination() // Рендерим пагинацию. Описание тоже ниже.

   document.addEventListener('selectCallback', function (e) {
      // Селект
      const currentSelect = e.detail.select
      const curVal = currentSelect.value
      if (curVal === 'ALL') {
         chunks = SplitParts(data)
      } else {
         chunks = SplitParts(
            data.filter(function (elem) {
               return elem.classList.contains(curVal)
            })
         )
      }

      RenderChunks(0) // После отработки фильтра важно перерендерить части..
      RenderPagination() // и пагинацию
   })

   // Функция которая делит массив на части.
   function SplitParts(arr) {
      // передаём массив, который нужно разбить
      if (arr.length > lengthPart) {
         // проверяем, имеет ли переданный массив длину больше, чем длина части
         const _chunks = [],
            // подготавливаем возращаемый массив с частями
            parts = Math.floor(arr.length / lengthPart) // сколько частей получится

         for (var i = 0; i < arr.length; i += lengthPart) {
            // проходим по массиву, шаг длине части
            _chunks.push(arr.slice(i, i + lengthPart))
         } // добавляем часть в массив с частями

         return _chunks // возвращаем массив
      } else return [arr] // если получаемый массив меньше длины части, то возвращаем его же.
   }

   // Функция для вывода конкретно части в HTML
   function RenderChunks(part) {
      // передаём порядковый номер части
      if (part >= 0 && part < chunks.length) {
         // если номер части > 0 и < длины частей
         regionaProduct.innerHTML = '' // очищаем элемент, куда будем выводить части

         chunks[part].map(function (elem) {
            return regionaProduct.append(elem)
         }) // Выводим т.к. в исходном массиве уже сразу Element, то мы можем добавить его через .append
      } else return false
   }

   // Механика работы пагинации
   regionalPaginationEl.addEventListener('click', (e) => {
      e.preventDefault()
      let item = e.target
      if (item.classList.contains('regional-pagination__item') || item.classList.contains('regional-pagination__arrow')) {
         let active = regionalPaginationEl.querySelector('.regional-pagination__item._active') // получим активную страницу
         let part // сюда запишем номер части, для проверок пагинации
         if (item.classList.contains('regional-pagination__arrow')) {
            // если нажата кнопка "вперёд" или "назад"
            if (item.classList.contains('_disable')) return false // Если кнопка имеет класс `_disable`, то прекращаем выполнение кода ниже
            part = +active.dataset.part // записываем номер части активной страницы.
            part = item.classList.contains('regional-pagination__arrow_prev') ? part - 1 : part + 1 // Если нажата кнопка "назад", то отнимаем единицу активной старница, если "вперёд", то прибавляем.
            RenderChunks(part) // Рендерим страница
            // Меняем в пагинации активную страницу
            active.classList.remove('_active') // Находим активную и удаляем класс `active`
            regionalPaginationEl.querySelector(`.regional-pagination__item[data-part="${part}"]`).classList.add('_active') // находим страницу с `data-part`, который равен активной странице и добавляем ему класс `active`
         } else {
            // Если нажаты кнопки страницы (1, 2, 3 и т.п.)
            active.classList.remove('_active') // удаляем класс `active` у активной.
            item.classList.add('_active') // добавляем нажатой кнопке класс `active`
            part = +item.dataset.part // получаем её номер части
            RenderChunks(part) // Рендерим страницу.
         }
         // Тут запрещаем или разрешаем использовать кнопки "вперёд" или "назад", в зависимости от того, какая часть сейчас активна.
         let prev = regionalPaginationEl.querySelector('.regional-pagination__arrow_prev')
         let next = regionalPaginationEl.querySelector('.regional-pagination__arrow_next')

         // Сначала удалим у них класс `_disable`, если он есть
         if (prev.classList.contains('_disable')) prev.classList.remove('_disable')
         if (next.classList.contains('_disable')) next.classList.remove('_disable')
         if (part === 0) prev.classList.add('_disable') // Проверим является ли активная страница началом частей, если да, то запретим использовать кнопку "назад"
         if (part === chunks.length - 1) next.classList.add('_disable') // если активная является концом частей, то запрещаем "вперёд".
         hideOverPages()
      }
   })

   function RenderPagination() {
      regionalPaginationEl.innerHTML = ''
      if (chunks.length > 1) {
         regionalPaginationEl.innerHTML = '<div class="regional-pagination__list"></div>'
         const regionalPaginationList = document.querySelector('.regional-pagination__list')
         // Добавляем кнопки
         chunks.map((e, i) =>
            regionalPaginationList.insertAdjacentHTML(
               'beforeend',
               `<button class="regional-pagination__item ${i === 0 ? '_active' : ''}" data-part="${i}">${i + 1}</button>`
            )
         )

         // Добавляем кнопки "вперёд" и "назад"
         regionalPaginationEl.insertAdjacentHTML(
            'afterbegin',
            '<button type="button"  class="regional-pagination__arrow regional-pagination__arrow_prev _icon-arrow-bottom _disable"></button>'
         ) // Т.к. данная функция создаёт пагинацию у которой первая страница активна, то сразу запрещаем кнопке "назад" работать.
         regionalPaginationEl.insertAdjacentHTML(
            'beforeend',
            '<button type="button" class="regional-pagination__arrow regional-pagination__arrow_next _icon-arrow-bottom"></button>'
         )
      }
      hideOverPages()
   }
   function hideOverPages() {
      const regionalPaginationList = document.querySelector('.regional-pagination__list')
      const active = regionalPaginationEl.querySelector('.regional-pagination__item._active') // получим активную страницу
      if (regionalPaginationList) {
         let items = [...regionalPaginationList.children]
         if (items.length > 5) {
            items.forEach((item) => item.classList.add('_hide'))
            items[0].classList.remove('_hide')
            if (active.previousElementSibling) {
               active.previousElementSibling.classList.remove('_hide')
            }
            active.classList.remove('_hide')
            if (active.nextElementSibling) {
               active.nextElementSibling.classList.remove('_hide')
            }
            items[items.length - 1].classList.remove('_hide')
         }
      }
   }

   // function countAmountUserInRegion() {
   //    const regionSelectList = document.querySelectorAll('.select__option');
   //    regionSelectList.forEach((reg) => {
   //       const curVal = data.filter((el) => {
   //          if (reg.dataset.value === 'ALL') return data.length;
   //          return reg.dataset.value === el.classList[2];
   //       });
   //       reg.insertAdjacentHTML('beforeend', `<span>(${curVal.length})</span>`);
   //    });
   // }
}
