"use strict";
var messages;

var connection = new signalR.HubConnectionBuilder()
        .withUrl("/note")
        .build();

Object.defineProperty(WebSocket, 'OPEN', { value: 1, });

connection.start().then(function () {
    console.log("Connected");
}).catch(function (err) {
    return console.error(err.toString());
});
        

connection.on("ReceiveMessage", function (user, message) {

    console.log("Mensaje recibido por el Hub");
    console.log(message);


    // Debe resetear el timeout para respuesta ***

    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    mensaje = JSON.parse(message);

    console.log("Mensaje recibido en el hub : " + mensaje.msg);
    // Determina los valores para conexion de las otras tramas
    if (mensaje.msg == "get param success") {
        console.log("Llego el mensaje con parametros");
        $("#actual_device_tag").html(mensaje.tag);
        $("#actual_device_id").html(mensaje.device_id);
        //device_tkn = mensaje.datas.device_token;

        // Trae todos los parametros de configuracion del dispositivo enlazado
        //getParameters();
        showActualParameters(mensaje);
    }

    if(mensaje.msg == "Upload Person Info!") {
        console.log("Registro de persona");
        
        appendLogMessages(mensaje);
        

    }

    console.log('Mensaje del Hub\n');
    console.log(mensaje);
    
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
    // document.getElementById("mqtt_receive").html(msg);
    console.log('Mensaje recibido por Hub' + encodedMsg);
});

// Adiciona el mensaje a la caja
function appendLogMessages(mensajelog) {
    console.log("Actualizando registro eventos");
    const messages = document.getElementById('log_messages');
    // console.log ("ClientHeight: " + messages.clientHeight);
    // console.log ("ScrollHeight!!!: " + messages.scrollHeight);


    // actualizar valor del numero de alarmas (no esta funcionando)
    var alarms = document.getElementById('alarm_badge');
    var alarmsValue = parseInt(alarms.textContent);
    
    if (mensaje.datas.temperature > 37.3)
        alarmsValue = alarmsValue + 1;

    alarms.textContent = alarmsValue;
    console.log("Alarmas : " + alarmsValue);
    // fin actualizar el valor mostrado en el badge encima de la campana

    var shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;
    console.log("ShouldScroll : " + shouldScroll);
    const message = document.getElementsByClassName('message')[0];
    const newMessage = message.cloneNode(true);

    console.log("Mensaje a adicionar: " + mensajelog.msg) 
    var color = (mensajelog.datas.temperature > 36.85) ? "red" : "green";
    
    newMessage.style.color = color;
    newMessage.style.fontSize = "75%";
    // determinar que tipo de mensaje es e imprimir
    newMessage.innerText =  mensajelog.datas.time + ' : ' + ((mensajelog.datas.name != "") ? mensajelog.datas.name : "Desconocido")  + " Temp : " + mensajelog.datas.temperature + "º" ;
    // message.innerText = ;
    console.log(newMessage);
    messages.appendChild(newMessage);

    // After getting your messages. Determinar si es necesario hacer scroll
    if (!shouldScroll) {
        messages.scrollTop = messages.scrollHeight;
    }
}

function showActualParameters(mensaje) {
    $("#actual_device_tag").html(mensaje.tag);
    $("#actual_device_time").html(mensaje.dev_cur_pts);
    $("#actual_device_name").html(mensaje.datas.basic_parameters.dev_name);
    console.log(mensaje.datas.basic_parameters.dev_name);
    $("#actual_device_pass").html(mensaje.datas.basic_parameters.dev_pwd);
    $("#actual_version").html(mensaje.datas.version_info.firmware_ver);
    $("#actual_firm_date").html(mensaje.datas.version_info.firmware_date);
    $("#actual_temp_en").html(mensaje.datas.fun_param.temp_dec_en);
    $("#actual_stranger_en").html(mensaje.datas.fun_param.stranger_pass_en);    
    $("#actual_make_en").html(mensaje.datas.fun_param.make_check_en);    
    $("#actual_alarm_temp").html(mensaje.datas.fun_param.alarm_temp);    
    $("#actual_temp_comp").html(mensaje.datas.fun_param.temp_comp);   ;
    $("#actual_record_time").html(mensaje.datas.fun_param.record_save_time);    
    $("#actual_save_record").html(mensaje.datas.fun_param.save_record);
    $("#actual_ip").html(mensaje.datas.network_cofnig.ip_addr);
    $("#actual_mqtt").html(mensaje.datas.mqtt_protocol_set.enable);
    $("#actual_mask").html(mensaje.datas.network_cofnig.net_mask);
    $("#actual_retain").html(mensaje.datas.mqtt_protocol_set.retain);
    $("#actual_gw").html(mensaje.datas.network_cofnig.gateway);
    $("#actual_pqos").html(mensaje.datas.mqtt_protocol_set.pqos);
    $("#actual_ddns1").html(mensaje.datas.network_cofnig.DDNS1);
    $("#actual_sqos").html(mensaje.datas.mqtt_protocol_set.sqos);
    $("#actual_ddns2").html(mensaje.datas.network_cofnig.DDNS2);
    $("#actual_server").html(mensaje.datas.mqtt_protocol_set.server);
    $("#actual_dhcp").html(mensaje.datas.network_cofnig.DHCP);
    $("#actual_username").html(mensaje.datas.mqtt_protocol_set.username);
    $("#actual_mqtt_password").html(mensaje.datas.mqtt_protocol_set.passwd);
    $("#actual_Topic2Subscribe").html(mensaje.datas.mqtt_protocol_set.topic2subscribe);
    $("#actual_Topic2Publish").html(mensaje.datas.mqtt_protocol_set.topic2publish);
    $("#actual_heartbeat").html(mensaje.datas.mqtt_protocol_set.heartbeat);
}




