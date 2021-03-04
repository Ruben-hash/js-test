//création des brick
  function create_bricks(nx,ny) {
    for(var i=0; i<nx; i++) {
      for(var j=0; j<ny; j++) {
      //premier paramètre http est la norme W3C du SVG se trouve dans le cache du navigateur.
        var b = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        //gestion de la position de la brick
        b = $(b).attr({x: i*W/nx, y:j*BRICKH, width:W/nx, height:BRICKH}).addClass("brick")
        b.css("fill", random_color())
        b.css("stroke", "black")
        $("svg").append(b)
      }
    }
  }

  function get_brick_at(x,y) {
    var i = Math.floor(y/BRICKH)
    var j = Math.floor(x/(W/XBRICKS))
    if(i>=YBRICKS) return null;
    if($("rect.brick").eq(j*YBRICKS+i).is(":visible")) return j*YBRICKS+i
    return null
  }

  function breakbrick_up(x,y) { return break_at(x+vx,y-R+vy) }
  function breakbrick_down(x,y) { return break_at(x+vx,y+R+vy) }
  function breakbrick_left(x,y) { return break_at(x+vx-R,y+vy) }
  function breakbrick_right(x,y) { return break_at(x+vx+R,y+vy) }

  function break_at(x,y) {
    var b = get_brick_at(x,y)
    if(b!==null) {
      $("rect.brick").eq(b).hide()
      nbricks--;
      return true
    }
    return false
  }

  function step() {
   //récupération de la postion du cercle dans le SVG  
    x = parseInt($("#ball").attr("cx"))
    y = parseInt($("#ball").attr("cy"))
    x += vx
    y += vy

    if((x>=W-R && vx>0) || (x<=R && vx<0)) rebond_h() // Rebond bors
    else if(y>=H-R-BH && x+R/2>=barx && x-R/2<=barx+BW) rebond_bar((x+R/2-barx)/(BW+R)) // Rebond barre
    else if(y<=R) rebond_v() // Rebond haut
    else if(breakbrick_up(x,y)) rebond_v()
    else if(breakbrick_left(x,y)) rebond_h()
    else if(breakbrick_right(x,y)) rebond_h()
    else if(breakbrick_down(x,y)) rebond_v()
    else if(y>=H-R) perdu()

    if(nbricks==0) gagne()
    $("#ball").attr("cx", x).attr("cy", y)
  }

  function rebond_v() { vy = -vy }
  function rebond_h() { vx = -vx }
  function rebond_bar(angle) {
    vy = -vy
    vx = 10*(angle - 0.5)
  }

  function perdu() {
    clearInterval(_i)
    $("#msg").text("YOU LOOSE !").show()
  }

  function gagne() {
    clearInterval(_i)
    $("#msg").text("YOU WIN !").show()
  }