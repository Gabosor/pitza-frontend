export const formatearDinero = cantidad => {
    return cantidad.toLocaleString('es-BO', {
        style: 'currency',
        currency: 'BOB'
    });
}
