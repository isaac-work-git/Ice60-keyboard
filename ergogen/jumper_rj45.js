module.exports = {
    params: {
        designator: { type: 'string', value: 'J' },
        from: { type: 'net', value: '' },
        to: { type: 'net', value: '' }
    },
    body: p => `
        (module lib:Jumper (layer F.Cu) (tedit 5E1ADAC2)
        ${p.at}

        (pad 1 smd rect (at -0.50038 0 ${p.r}) (size 0.635 1.143)
            (layers F.Cu F.Paste F.Mask) ${p.from})
        (pad 2 smd rect (at 0.50038 0 ${p.r}) (size 0.635 1.143)
            (layers F.Cu F.Paste F.Mask) ${p.to})
        )
    `
}