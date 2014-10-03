angular.module('myApp', []);

angular.module('myApp')
	.directive('myAnnotation', ['$document', function($document){
		var imgElement = angular.element('<img class="img-mask" src="img/brusli.jpeg">');
		var spanElements = [];

		var span_tl = angular.element("<span class='handler top-left'></span>");
		var span_tr = angular.element("<span class='handler top-right'></span>");
		var span_bl = angular.element("<span class='handler bottom-left'></span>");
		var span_br = angular.element("<span class='handler bottom-right'></span>");
		
		var maskElement = angular.element('<div class="mask-div" ng-click="maskSelected($event)"></div>');
		
		var link = function(scope, elm){
			var startX, startY, initialMouseX, initialMouseY, w, h, initialW, initialH, dx, dy, top, left;	
			initialW = 180;
			initialH = 110;	
			
			function mouseDownHandler($event, source){
				startX = maskElement.prop('offsetLeft');
				startY = maskElement.prop('offsetTop');
				
				initialMouseX = $event.clientX;
        initialMouseY = $event.clientY;

        if(source!='img'){
        	$document.unbind('mousemove', mousemove);
        	$document.unbind('mouseup', mouseup);
        }

			}


			imgElement.bind('mousedown', function($event) {
       	
       	mouseDownHandler($event, 'img');
			
				$document.bind('mousemove', mousemove);
        $document.bind('mouseup', mouseup);
      
        return false;
      });


			
			
			span_tl.bind('mousedown', function($event){
				
        mouseDownHandler($event, 'tl');
				
        $document.bind('mousemove',mousemove_tl);
        $document.bind('mouseup', mouseup_tl);
       
			});

			span_tr.bind('mousedown', function($event){
				mouseDownHandler($event, 'tr');
				
        $document.bind('mousemove', mousemove_tr);
        $document.bind('mouseup', mouseup_tr);
       
			});

			span_bl.bind('mousedown', function($event){
				
				mouseDownHandler($event, 'bl');
				
        $document.bind('mousemove', mousemove_bl);
        $document.bind('mouseup', mouseup_bl);
       
			});

			span_br.bind('mousedown', function($event){
				
				mouseDownHandler($event, 'br');
	
        $document.bind('mousemove', mousemove_br);
        $document.bind('mouseup', mouseup_br);
       
			});



			function mouseMoveHandler($event, coef){
				dx = $event.clientX - initialMouseX;
        dy = $event.clientY - initialMouseY;
        
        left = startX + coef[0] * dx;
        top = startY + coef[1] * dy;
       
        w = initialW + coef[2] * dx;
        h = initialH + coef[3] * dy;

        maskElement.css({
          top:  top + 'px',
          left: left + 'px',
          width: w + 'px',
          height: h + 'px'
        });

        var clip = 'rect(' + top + 'px, ' + ( left + w ) + 'px, ' +  (top + h) + 'px, ' + left + 'px)';
        imgElement.css({
        	top: parseInt(-top) + 'px',
        	left: parseInt(-left) + 'px',
        	clip: clip
        	
        });

			}



			function mousemove_tl($event){
				mouseMoveHandler($event, [1, 1, -1, -1]);
				return false;
			};

			function mousemove_tr($event){
        mouseMoveHandler($event, [0, 1, 1, -1]);
        return false;
     	};




			function mousemove_bl($event){
        mouseMoveHandler($event, [1, 0, -1, 1]);
        return false;
     	};

    	function mousemove_br($event){
				mouseMoveHandler($event, [0, 0, 1, 1]);
				return false;
      };

    	function mousemove($event) {
      	mouseMoveHandler($event, [1, 1, 0, 0]);
        return false;
      };





			
     






      
      function setSize(){
      	initialW = w;
      	initialH = h;
      	
      }
      
      function mouseup_tl($event){
      	setSize();

      	$document.unbind('mousemove', mousemove_tl);
        $document.unbind('mouseup', mouseup_tl);
      }

      function mouseup_tr($event){
      	setSize();
      	
      	$document.unbind('mousemove', mousemove_tr);
        $document.unbind('mouseup', mouseup_tr);
      }


      function mouseup_bl($event){
      	setSize();
      	
      	$document.unbind('mousemove', mousemove_bl);
        $document.unbind('mouseup', mouseup_bl);
      }

      function mouseup_br($event){
      	setSize();
      	
      	$document.unbind('mousemove', mousemove_br);
        $document.unbind('mouseup', mouseup_br);
      }



      

      function mouseup($event){
      	$document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
      };


		};

		return {
			restrict: 'E',
			scope: {},
			template: '<div class="annotation-container"><img class="img-original" src="img/brusli.jpeg"></div>',
			controller: function($scope){
				
				$scope.maskSelected = function($event){
				
				};

			},
			compile: function(tElem){
				maskElement.append(span_tl);
				maskElement.append(span_tr);
				maskElement.append(span_bl);
				maskElement.append(span_br);
				
				maskElement.append(imgElement);
				var el = angular.element(tElem.children()[0]);
				el.append(maskElement);
				return link;
			}
			
		};
	}]);

