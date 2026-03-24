// Reversible RJ45 8P8C SMT connector (Kycon GMX-SMT2-N-88 style)
// Front + back SMD pads, plus two NPTH mounting holes and courtyard.

module.exports = {
  params: {
    designator: 'J',
    side: 'F',          // F or B (for reference text / primary side)
    reversible: true,   // always true for this use case

    P1: { type: 'net', value: 'P1' },
    P2: { type: 'net', value: 'P2' },
    P3: { type: 'net', value: 'P3' },
    P4: { type: 'net', value: 'P4' },
    P5: { type: 'net', value: 'P5' },
    P6: { type: 'net', value: 'P6' },
    P7: { type: 'net', value: 'P7' },
    P8: { type: 'net', value: 'P8' },
  },

  body: p => {
    const nets = [p.P1, p.P2, p.P3, p.P4, p.P5, p.P6, p.P7, p.P8];

    const x = [-4.445, -3.175, -1.905, -0.635, 0.635, 1.905, 3.175, 4.445];
    const y = 0;
    const pad_w = 0.76;
    const pad_h = 3.18;

    const top = `
  (footprint "rj45_8p8c_smt_reversible"
    (layer ${p.side}.Cu)
    ${p.at}
    (property "Reference" "${p.ref}"
      (at 0 3 ${p.r})
      (layer "${p.side}.SilkS")
      ${p.ref_hide}
      (effects (font (size 0.75 0.75) (thickness 0.15)))
    )
    (property "Value" "RJ45_8P8C"
      (at 0 5 ${p.r})
      (layer "${p.side}.Fab")
      (effects (font (size 0.75 0.75) (thickness 0.15)))
    )
    (attr smd)
    `;

    // Courtyard (same as KiCad footprint, both sides)
    const courtyard = `
    (fp_line (start -7.5 0) (end 7.5 0) (layer "F.CrtYd") (stroke (width 0.1) (type solid)))
    (fp_line (start -7.5 18.1) (end 7.5 18.1) (layer "F.CrtYd") (stroke (width 0.1) (type solid)))
    (fp_line (start -7.5 0) (end -7.5 18.1) (layer "F.CrtYd") (stroke (width 0.1) (type solid)))
    (fp_line (start 7.5 0) (end 7.5 18.1) (layer "F.CrtYd") (stroke (width 0.1) (type solid)))

    (fp_line (start -7.5 0) (end 7.5 0) (layer "B.CrtYd") (stroke (width 0.1) (type solid)))
    (fp_line (start -7.5 18.1) (end 7.5 18.1) (layer "B.CrtYd") (stroke (width 0.1) (type solid)))
    (fp_line (start -7.5 0) (end -7.5 18.1) (layer "B.CrtYd") (stroke (width 0.1) (type solid)))
    (fp_line (start 7.5 0) (end 7.5 18.1) (layer "B.CrtYd") (stroke (width 0.1) (type solid)))
    `;

    // Simple outline on Dwgs.User for body
    const outline = `
    (fp_line (start -7.5 0) (end 7.5 0) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -7.5 18.1) (end 7.5 18.1) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start -7.5 0) (end -7.5 18.1) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    (fp_line (start 7.5 0) (end 7.5 18.1) (layer "Dwgs.User") (stroke (width 0.15) (type solid)))
    `;

    // NPTH mounting holes
    const holes = `
    (pad "" np_thru_hole circle (at 5.715 11.47 ${p.r}) (size 3.25 3.25) (drill 3.25) (layers "*.Cu" "*.Mask"))
    (pad "" np_thru_hole circle (at -5.715 11.47 ${p.r}) (size 3.25 3.25) (drill 3.25) (layers "*.Cu" "*.Mask"))
    `;

    // Pads: same pad numbers on both sides, same nets
    let pads = '';
    for (let i = 0; i < 8; i++) {
      const n = nets[i];
      const padnum = i + 1;

      pads += `
    (pad "${padnum}" smd rect (at ${x[i]} ${y} ${p.r}) (size ${pad_w} ${pad_h}) (layers "F.Cu" "F.Paste" "F.Mask") ${n.str})
    (pad "${padnum}" smd rect (at ${x[i]} ${y} ${p.r}) (size ${pad_w} ${pad_h}) (layers "B.Cu" "B.Paste" "B.Mask") ${n.str})
      `;
    }

    const bottom = `
  )
    `;

    return top + courtyard + outline + holes + pads + bottom;
  }
};
