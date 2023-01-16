import Stripe from 'stripe';

import usuario from '../models/usuario.js';
const stripe = new Stripe('sk_test_51MKBiWHndwbuKGYD5X0wapmPK48RoOTQugpKetLuIcOWEiccLllCRNLmpRM5wtzG1PV7E9F34fAzxQs31ZAFWrIK00rMvpthvs');
const controller = {};
const YOUR_DOMAIN = 'http://localhost:5000/confirmar_pago';
controller.pago = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        submit_type: 'donate',
        line_items: [
            {
                price: 'price_1MKOHeHndwbuKGYD23olasaa',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}`,
    });

    res.redirect(303, session.url);
}

controller.confirmar_pago = (req, res) => {
    if (req.session.passport) {
        usuario.registrar_usuario_que_dona(req).then((response) => {
            console.log(response);
            res.render('./pago_exitoso', { ruta: '/donantes' })
        }).catch((err) => {
            console.log(err);
        })
    } else {
        res.render('./pago_exitoso', { ruta: '/' })
    }
}




export default controller;