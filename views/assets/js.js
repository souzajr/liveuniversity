// GET BUTTON 'OPTION' AND SIDEBAR BY CLASS
const toggleBtn = document.querySelector('.sidebar-toggle')
const sidebar = document.querySelector('.sidebar')
// DECLARATION OF GLOBAL VARIABLES
let countPages, currentPage, itemSelect, itemsPerPage = []

// CLOSE OR OPEN SIDEBAR IF TOGGLEBTN WAS CLICKED
$('.sidebar-toggle').on('click', function () {
    // OPEN/CLOSE THE SIDEBAR
    toggleBtn.classList.toggle('is-closed')
    sidebar.classList.toggle('is-closed')
})

// CLOSE THE SIDEBAR IF THE CLICK WAS OUTSIDE THE SIDEBAR
$(document).click(function (e) {
    const check = $(e.target).prop('className').split(' ')
    // CHECK IF THE CLICK DID NOT HAPPEN IN THE SIDEBAR/BUTTON/SELECT
    if (check[0] !== 'sidebar' && check[0] !== 'sidebar-toggle' && check[0] !== 'select') {
        // CHECK IF THE SIDEBAR IS ALREADY CLOSED
        if (toggleBtn.classList.length !== 2) {
            // CLOSE THE SIDEBAR
            toggleBtn.classList.toggle('is-closed')
            sidebar.classList.toggle('is-closed')
        }
    }
})

// START SLIDER FUNCTION
function sliderFunction(item, quantity) {
    $('.items').empty()
    const pageSize = quantity / 3
    // IF PAGESIZE HAVE LESS THAN THREE ITEMS, SHOW THE ITEMS AND END
    if(pageSize <= 1) {
        $('.pagination').hide()
        for(let i = 0; i < quantity; i++) {
            $('.items').append(
                "<div class='container'>" +
                "<div class='circle'>" + (i + 1) + "</div>" +
                "<div class='item'>Item " + item + (i + 1) + "</div>" +
                "</div>"
            )
        } 
    } else { 
        let pages = 0, count = 0

        //#region COUNTING THE NUMBER OF PAGES NEEDED TO SHOW ALL ITEMS
        for(let i = 0; i < quantity; i++) {
            count++
            if(count === 3) {
                pages++
                count = 0
            }
        }

        if(pageSize % 1 != 0) pages++
        countPages = pages
        //#endregion

        //#region ASSIGNING VALUES ​​FOR EACH PAGE
        itemSelect = item
        itemsPerPage = []
        let countItems = quantity
        for(let i = 1; i < pages + 1; i++) {
            if(countItems > 3) {
                itemsPerPage.push({
                    page: i,
                    items: 3
                })
                
                countItems -= 3
            } else if(countItems === 3) {
                itemsPerPage.push({
                    page: i,
                    items: 3
                })
                
                break
            } else {
                itemsPerPage.push({
                    page: i,
                    items: countItems
                })

                break
            }
        }
        //#endregion

        // SETTING THE CURRENT PAGE
        currentPage = 1
        // SHOW THE FIRST PAGE
        for(let i = 0; i < 3; i++) {
            $('.items').append(
                "<div class='container'>" +
                "<div class='circle'>" + (i + 1) + "</div>" +
                "<div class='item'>Item " + item + (i + 1) + "</div>" +
                "</div>"
            )
        }

        // CONFIGURATION OF SLIDE BUTTONS
        $('.pagination').show()
        $('.prev').attr('disabled', true)
        $('.next').attr('disabled', false)
    }
}

// CLICK ON THE NEXT BUTTON
$('.next').on('click', function () {
    // CHECK IF THE CURRENT PAGE IS LESS THAN THE TOTAL PAGE VALUE
    if(currentPage < countPages) {
        $('.items').empty()
        $('.prev').attr('disabled', false)
        // UPDATING THE CURRENT PAGE
        currentPage++

        // GET THE NUMBERS OF THE ITEMS TO SHOW
        let numberOfItensInPage = 3 * currentPage - 3 + itemsPerPage[currentPage - 1].items
        
        // SHOW THE PAGE
        for(let i = numberOfItensInPage - itemsPerPage[currentPage - 1].items; i < numberOfItensInPage; i++) {
            $('.items').append(
                "<div class='container'>" +
                "<div class='circle'>" + (i + 1) + "</div>" +
                "<div class='item'>Item " + itemSelect + (i + 1) + "</div>" +
                "</div>"
            )
        }

        // IF THE CURRENT PAGE VALUE WAS EQUAL TO THE TOTAL PAGE VALUE, DISABLE THE NEXT BUTTON
        if(currentPage == countPages) $('.next').attr('disabled', true)
    }
})

// CLICK ON THE PREV BUTTON
$('.prev').on('click', function () {
    // CHECK IF THE CURRENT PAGE IS BIGGER THAN ONE
    if(currentPage > 1) {
        $('.items').empty()
        $('.prev').attr('disabled', false)
        // UPDATING THE CURRENT PAGE
        currentPage--

        //#region GET THE NUMBERS OF THE ITEMS TO SHOW AND SHOW THE PAGE
        let numberOfItensInPage = 3 * currentPage - 3 + itemsPerPage[currentPage - 1].items
        for(let i = numberOfItensInPage - itemsPerPage[currentPage - 1].items; i < numberOfItensInPage; i++) {
            $('.items').append(
                "<div class='container'>" +
                "<div class='circle'>" + (i + 1) + "</div>" +
                "<div class='item'>Item " + itemSelect + (i + 1) + "</div>" +
                "</div>"
            )
        }
        //#endregion

        // CONFIGURATION OF SLIDE BUTTONS
        if(currentPage == 1) $('.prev').attr('disabled', true)
        if(currentPage < countPages) $('.next').attr('disabled', false)
    }
})

// GET ITEM
$('.select').on('change', function () {
    // GET QUANTITY
    const quantity = parseInt(document.getElementById('quantity').value)
    // VALIDATION OF QUANTITY
    if (quantity.toString() === 'NaN' || quantity < 1) {
        $('.pagination').hide()
        $('.items').hide()
        document.getElementById('quantity').style.backgroundColor = 'red'
        return alert('Invalid quantity, please type a number bigger or equal than 1')
    }

    document.getElementById('quantity').style.backgroundColor = ''

    // VALIDATION OF ITEM
    if ($(this).val() === 'A') {
        $('.items').show()
        // CALLING THE SLIDER FUNCTION, PASSING ITEM AND QUANTITY
        sliderFunction('A', quantity)
    } else if ($(this).val() === 'B') {
        $('.items').show()
        // CALLING THE SLIDER FUNCTION, PASSING ITEM AND QUANTITY
        sliderFunction('B', quantity)
    } else {
        // ERROR CASE
        $('.pagination').hide()
        $('.items').hide()
        document.getElementById('quantity').style.backgroundColor = 'red'
        alert('Invalid dropdown, please select other option')
    }
})