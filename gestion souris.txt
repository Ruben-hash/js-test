  barx=0
  $(function() {
    svg = $("svg")

    $(window).keyup((e) => {
      if(e.key == ' ') location.reload()
    })

    $("#bar").attr("width", BW).attr("height", BH)
    $("#ball").attr("r", R)
    W = $("svg").width()
    H = $("svg").height()
//recupération gestion de la souris offsetX et Y donnant la position sur écran
    svg.on('mousemove', (e) => {
      barx = e.offsetX
      if(barx>=W-BW) barx = W-BW
      $("#bar").attr("x", barx)
    })

    create_bricks(XBRICKS,YBRICKS)

    _i = setInterval(step, 9)
  })


  