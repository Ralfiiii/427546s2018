$(function() {
    //variable def & init

    var posArr = [];
    var mousedown = false;
    $('.outer > div').hide();
    $('input').each(function(){
        $(this).val(0);
    });

    function draw_pixel(cnt, point_x, point_y)
    {

        var myImageData = cnt.createImageData(1, 1);
        myImageData.data[0]=255;
        myImageData.data[1]=0;
        myImageData.data[2]=0;
        // myImageData.data[0]=parseInt(Math.random()*255+1);
        // myImageData.data[1]=parseInt(Math.random()*255+1);
        // myImageData.data[2]=parseInt(Math.random()*255+1);
        myImageData.data[3]=255;
        cnt.putImageData(myImageData, point_x, point_y);
    };

    function canvPos(Canv, e){
        var  canvRect = Canv.getBoundingClientRect();
        return{
            x: parseInt((e.clientX - canvRect.left) * (Canv.width/canvRect.width)),
            y: parseInt((e.clientY - canvRect.top) *(Canv.height/canvRect.height))
        };
    };


//-----------------------------------Line-------------------------------------
    var lineCas = $('#lineCanvas')[0];
    var lineCnt = lineCas.getContext('2d');
    lineCnt.fillStyle = '#F00';

    function DrawLine(cnt, x0, y0, x1, y1) {
        var x0 = parseInt(x0);
        var y0 = parseInt(y0);
        var x1 = parseInt(x1);
        var y1 = parseInt(y1);
        var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
        var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
        var err = (dx>dy ? dx : -dy)/2;

        while (true) {
            draw_pixel(cnt,x0,y0);
            if (x0 === x1 && y0 === y1) break;
            var e2 = err;
            if (e2 > -dx) { err -= dy; x0 += sx; }
            if (e2 < dy) { err += dx; y0 += sy; }
        }
    }

    $('.line').click(function(e){
        cleanAll();
        posArr = [];
        $('.outer > div').hide();
        $('.linebox').show();
        lineCas.addEventListener('mousedown',function(e){
            mousedown = true;
            posArr.push(canvPos(lineCas, e).x);
            posArr.push(canvPos(lineCas, e).y);

        });

        lineCas.addEventListener('mousemove',function(e){
            if(mousedown){
                posArr[2] = (canvPos(lineCas, e).x);
                posArr[3] = (canvPos(lineCas, e).y);
                cleanAll();
                DrawLine(lineCnt, posArr[0], posArr[1], posArr[2], posArr[3]);
            }
        });

        lineCas.addEventListener('mouseup',function(e){
            if(mousedown){
                posArr = [];
            }
            mousedown = false;
        });
     })


    function cleanLine(){
        lineCnt.clearRect(0,0,lineCas.width,lineCas.height);
        lineCnt.width = lineCnt.width;
        lineCnt.save();
    }


//-----------------------------------Circle-------------------------------------
    var cirCas = $('#cirCanvas')[0];
    var cirCnt = cirCas.getContext('2d');
    cirCnt.fillStyle = '#F00';

    function drawCir(cnt, centerX, centerY, pointx, pointy)
    {
        centerX = parseInt(centerX);
        centerY = parseInt(centerY);
        radius = Math.sqrt(Math.pow(centerX - pointx, 2) + Math.pow(centerY - pointy, 2));
        d = (5 - radius * 4)/4;
        x = 0;
        y = radius;

        do {
            draw_pixel(cnt,centerX + x, centerY + y);
            draw_pixel(cnt,centerX + x, centerY - y);
            draw_pixel(cnt,centerX - x, centerY + y);
            draw_pixel(cnt,centerX - x, centerY - y);
            draw_pixel(cnt,centerX + y, centerY + x);
            draw_pixel(cnt,centerX + y, centerY - x);
            draw_pixel(cnt,centerX - y, centerY + x);
            draw_pixel(cnt,centerX - y, centerY - x);
            if (d < 0) {
                d += 2 * x + 1;
            } else {
                d += 2 * (x - y) + 1;
                y--;
            }
            x = x + 1;
        } while (x <= y);

    }

    $('.circle').click(function(e){
        cleanAll();
        posArr = [];

        $('.outer > div').hide();
        $('.circleBox').show();
        cirCas.addEventListener('mousedown',function(e){
            mousedown = true;
            cleanAll();
            posArr[0] = (canvPos(cirCas, e).x);
            posArr[1] = (canvPos(cirCas, e).y);

        });

        cirCas.addEventListener('mousemove',function(e){
            if(mousedown){
                posArr[2] = (canvPos(cirCas, e).x);
                posArr[3] = (canvPos(cirCas, e).y);

                cleanAll();
                drawCir(cirCnt, posArr[0], posArr[1], posArr[2], posArr[3]);
            }
        });

        cirCas.addEventListener('mouseup',function(e){
            if(mousedown){
                posArr = [];
            }
            mousedown = false;
        });
    })

    function cleanCircle(){
        cirCnt.clearRect(0,0,cirCas.width,cirCas.height);
        cirCnt.width = cirCnt.width;
        cirCnt.save();
    }



//--------------------------ellipse-------------------
    var elliCas = $('#elliCanvas')[0];
    var elliCnt = elliCas.getContext('2d');
    elliCnt.fillStyle = '#F00';

    function drawElli(cnt, point_x, point_y, radius_x, radius_y)
    {
        draw_pixel(cnt, point_x + radius_x, point_y + radius_y);
        draw_pixel(cnt, point_x - radius_x, point_y + radius_y);
        draw_pixel(cnt, point_x + radius_x, point_y - radius_y);
        draw_pixel(cnt, point_x - radius_x, point_y - radius_y);
    }

    function elli_data(cnt,centerX, centerY, pointx, pointy) {
        var centerX = parseInt(centerX);
        var centerY = parseInt(centerY);
        var a = Math.ceil(Math.sqrt(Math.pow(centerX - pointx, 2) + Math.pow(centerY - pointy, 2)));
        if(a==0){a = 100};
        var b = Math.ceil(a*0.5);

        var a2 = a*a, b2 = b*b, fa2 = 4*a2, fb2 = 4*b2;
        var x = 0, y = b, sigma = 2*b2 + a2* (1-2*b);

        while(b2*x <= a2*y){
            drawElli(cnt,centerX,centerY,x,y);
            if (sigma >=0){
                sigma += fa2*(1-y);
                y-=1;
            }
            sigma += b2*(4*x+6);
            x+=1;
        }

        x = a; y = 0; sigma = 2*a2 + b2* (1-2*a);
        while(a2*y < b2*x){
            drawElli(cnt,centerX,centerY,x,y);
            if (sigma >=0){
                sigma += fb2*(1-x);
                x-=1;
            }
            sigma += a2*(4*y+6);
            y+=1;
        }
    }


    $('.ellipse').click(function(e){
        cleanAll();
        posArr = [];

        $('.outer > div').hide();
        $('.elliBox').show();
        elliCas.addEventListener('mousedown',function(e){
            mousedown = true;
            posArr.push(canvPos(elliCas, e).x);
            posArr.push(canvPos(elliCas, e).y);
        });

        elliCas.addEventListener('mousemove',function(e){
            if(mousedown){
                cleanAll();
                posArr[2] = (canvPos(elliCas, e).x);
                posArr[3] = (canvPos(elliCas, e).y);
                elli_data(elliCnt, posArr[0], posArr[1], posArr[2], posArr[3]);

            }
        });

        elliCas.addEventListener('mouseup',function(e){
            if(mousedown){
                posArr = [];
            }
            mousedown = false;
        });
    })

    function cleanElli(){
        elliCnt.clearRect(0,0,elliCas.width,elliCas.height);
        elliCnt.width = elliCnt.width;
        elliCnt.save();
    }

    //------------------------Rectangle----------------------------
    var rectangleCas = $('#rectCanvas')[0];
    var rectangleCnt = rectangleCas.getContext('2d');
    rectangleCnt.fillStyle = '#F00';

    function DrawRectangle(cnt, LTx, LTy, RBx, RBy) {
        var x0 = parseInt(LTx);
        var y0 = parseInt(LTy);
        var x1 = parseInt(RBx);
        var y1 = parseInt(RBy);

        DrawLine(rectangleCnt, x0, y0, x1, y0);
        DrawLine(rectangleCnt, x1, y0, x1, y1);
        DrawLine(rectangleCnt, x1, y1, x0, y1);
        DrawLine(rectangleCnt, x0, y1, x0, y0);

    }

    $('.rectangles').click(function(){
        cleanAll();
        posArr = [];

        $('.outer > div').hide();
        $('.rectBox').show();

        rectangleCas.addEventListener('mousedown',function(e){
            mousedown = true;
            posArr.push(canvPos(rectangleCas, e).x);
            posArr.push(canvPos(rectangleCas, e).y);
        });

        rectangleCas.addEventListener('mousemove',function(e){
            if(mousedown){
                cleanAll();
                posArr[2] = (canvPos(rectangleCas, e).x);
                posArr[3] = (canvPos(rectangleCas, e).y);
                DrawRectangle(rectangleCnt, posArr[0], posArr[1], posArr[2], posArr[3]);
            }
        });

        rectangleCas.addEventListener('mouseup',function(e){
            if(mousedown){
                posArr = [];
            }
            mousedown = false;
        });
        console.log('rectangle');

    })

    function cleanRectangle(){
        rectangleCnt.clearRect(0,0,rectangleCas.width,lineCas.height);
        rectangleCnt.width = rectangleCnt.width;
        rectangleCnt.save();
    }


    //------------------------polygon------------------------------
    var pgCas = $('#polygonCanvas')[0];
    var pgCnt = pgCas.getContext('2d');
    pgCnt.fillStyle = '#F00';

    function pgdown(x,y){
        if(posArr.length == 0){
            cleanAll();
            posArr.push(x,y);
        }else{
            cleanAll();
            var ptx = posArr[0];
            var pty = posArr[1];
            for (var i = 2; i+1 < posArr.length; i += 2) {
                DrawLine(pgCnt, ptx,pty,posArr[i],posArr[i+1]);
                ptx = posArr[i];
                pty = posArr[i+1];
            }
            DrawLine(pgCnt,ptx,pty,x,y);
        }
    }

    function pgdrag(x,y){
        cleanAll();

        var ptx = posArr[0];
        var pty = posArr[1];
        for (var i = 2; i+1 < posArr.length; i += 2) {
            DrawLine(pgCnt, ptx,pty,posArr[i],posArr[i+1]);
            ptx = posArr[i];
            pty = posArr[i+1];
        }
        DrawLine(pgCnt,ptx,pty,x,y);

    }

    $('.polygons').click(function(e){
        cleanAll();
        posArr = [];

        $('.outer > div').hide();
        $('.polygonBox').show();
        pgCas.addEventListener('mousedown',function(e){
            mousedown = true;
            var mousePos = canvPos(pgCas, e);
            pgdown(mousePos.x, mousePos.y);
        });

        pgCas.addEventListener('mousemove',function(e){
            if(mousedown){
                var mousePos = canvPos(pgCas, e);
                pgdrag(mousePos.x, mousePos.y);
            }
        });
        pgCas.addEventListener('mouseup',function(e){
            if(mousedown){
                var mousePos = canvPos(pgCas, e);
                posArr.push(mousePos.x, mousePos.y);
                DrawLine(pgCnt, posArr[0], posArr[1], posArr[posArr.length-2],posArr[posArr.length-1])
            }
            mousedown = false;
        });
        console.log('polyline');
    })

    function cleanPG(){
        pgCnt.clearRect(0,0,pgCas.width,pgCas.height);
        pgCnt.width = pgCnt.width;
        pgCnt.save();
    }

//------------------------polyline------------------------------
    var plCas = $('#polylineCanvas')[0];
    var plCnt = plCas.getContext('2d');
    plCnt.fillStyle = '#F00';

    function down(x,y){
        if(posArr.length == 0){
            cleanAll();
            posArr.push(x,y);
        }else{
            cleanAll();
            var ptx = posArr[0];
            var pty = posArr[1];
            for (var i = 2; i+1 < posArr.length; i += 2) {
                DrawLine(plCnt, ptx,pty,posArr[i],posArr[i+1]);
                ptx = posArr[i];
                pty = posArr[i+1];
            }
            DrawLine(plCnt,ptx,pty,x,y);
        }
    }

    function drag(x,y){
        cleanAll();

        var ptx = posArr[0];
        var pty = posArr[1];
        for (var i = 2; i+1 < posArr.length; i += 2) {
            DrawLine(plCnt, ptx,pty,posArr[i],posArr[i+1]);
            ptx = posArr[i];
            pty = posArr[i+1];
        }
        DrawLine(plCnt,ptx,pty,x,y);

    }

    $('.polylines').click(function(e){
        cleanAll();
        posArr = [];

        $('.outer > div').hide();
        $('.polylineBox').show();
        plCas.addEventListener('mousedown',function(e){
            mousedown = true;
            var mousePos = canvPos(plCas, e);
            down(mousePos.x, mousePos.y);
        });

        plCas.addEventListener('mousemove',function(e){
            if(mousedown){
                var mousePos = canvPos(plCas, e);
                drag(mousePos.x, mousePos.y);
            }
        });
        plCas.addEventListener('mouseup',function(e){
            if(mousedown){
                var mousePos = canvPos(plCas, e);
                posArr.push(mousePos.x, mousePos.y);

            }
            mousedown = false;
        });
        console.log('polyline');
    })

    function cleanPL(){
        plCnt.clearRect(0,0,plCas.width,plCas.height);
        plCnt.width = plCnt.width;
        plCnt.save();
    }

 //------------------------clean all----------------------------
    function cleanAll() {
        cleanLine();
        cleanCircle();
        cleanElli();
        cleanRectangle();
        cleanPG();
        cleanPL();
    }

    $('.clean').click(function(){
        cleanAll();
    })

})

