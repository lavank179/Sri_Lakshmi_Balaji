//Nav-link active on scrolling to appropriate section
$(window).scroll(function () {
    var scrollDistance = $(window).scrollTop() + 100;

    $('section').each(function (i) {
        if ($(this).position().top <= scrollDistance) {
            $('ul a.active1').removeClass('active1');


            $('ul a').eq(i).addClass('active1');

        }
    });
}).scroll();

function callUs() {
    window.location.href = 'tel:9550603996';
}

function getDirections() {
    window.location.href = 'https://goo.gl/maps/WBDt8qnH4r61gL4P8';
}

// contact form validation
let v1 = false,
    v2 = false,
    v3 = false,
    v4 = false,
    v5 = false;

EDsubbtn();

function getInputVals(a1, a2, a3, a4) {
    var text = document.querySelector("#" + a1).value;
    if (!a2.test(text)) {
        $("#" + a4).html(a3);
        $("#" + a4).addClass("alert-danger");
        $("#" + a1).addClass("addRed");
        $("#" + a1).removeClass("addGreen");
        if (a1 == "contactEmail") v1 = false;
        if (a1 == "contactName") v2 = false;
        if (a1 == "username") v3 = false;
    } else {
        $("#" + a4).removeClass("alert-danger");
        $("#" + a4).empty();
        $("#" + a1).addClass("addGreen");
        $("#" + a1).removeClass("addRed");
        if (a1 == "contactEmail") v1 = true;
        if (a1 == "contactName") v2 = true;
        if (a1 == "contactPhone") v3 = true;
    }
    EDsubbtn();
}

$("#contactEmail").keyup(function () {
    var regx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    getInputVals(
        "contactEmail",
        regx,
        "Email should be valid. EG: example@example.com",
        "er2"
    );
});

$("#contactName").keyup(function () {
    var regx = /^[a-zA-Z \-]{5,20}$/;
    getInputVals("contactName", regx, "Name should be valid.", "er1");
});

$("#contactPhone").keyup(function () {
    var regx = /^([0|+[0-9]{1,5})?([6-9][0-9]{9})$/;
    getInputVals(
        "contactPhone",
        regx,
        `Mobile number should be valid. +(**) - country code AND (**********) - 10 digit number`,
        "er3"
    );
});

$("#contactMessage").keyup(function () {
    let text = document.querySelector("#contactMessage").value;
    if (text.length < 10) {
        $("#er4").html("Message should be atleast 10 characters long!");
        $("#er4").addClass("alert-danger");
        $("#contactMessage").addClass("addRed");
        $("#contactMessage").removeClass("addGreen");
        v4 = false;
    } else {
        $("#er4").removeClass("alert-danger");
        $("#er4").empty();
        $("#contactMessage").addClass("addGreen");
        $("#contactMessage").removeClass("addRed");
        v4 = true;
    }
    EDsubbtn();
});

function EDsubbtn() {
    if (v1 == true && v2 == true && v3 == true && v4 == true) {
        document.querySelector("#submitMessage").disabled = false;
        document.querySelector("#submitMessage").classList.add("btn-primary");

    } else {
        document.querySelector("#submitMessage").disabled = true;
        document.querySelector("#submitMessage").classList.remove("btn-primary");

    }
}

// submit the contact form
function sendEmail() {
    let name = document.querySelector("#contactName").value;
    let email = document.querySelector("#contactEmail").value;
    let phone = document.querySelector("#contactPhone").value;
    let message = document.querySelector("#contactMessage").value;


    $.ajax({
        async: false,
        url: "https://lavanram.000webhostapp.com/sri_laxmi_balaji.json",
        method: "GET",
        success: function (data) {
            let fromEmail = data[0].email;
            let fromPassword = data[0].password;
            console.log(fromEmail, fromPassword);

            // send the email
            Email.send({
                Host: "smtp.gmail.com",
                Username: fromEmail,
                Password: fromPassword,
                To: 'srilaxmibalaji77@gmail.com',
                From: fromEmail,
                Subject: "Message Sri Lakshmi Balaji - from " + name,
                Body: `<h1> Sri Lakshmi Balaji <h1><br>
            <h3> Message from <br>${name} - ${email} <br>- ${phone} <h3><br>
            <h4> Message: ${message} <h5>`,
            }).then(
                message => alert("mail sent successfully")
            );
        },
    });
}