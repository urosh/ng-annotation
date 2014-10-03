angular.module('myApp', []);

angular.module('myApp')
	.directive('myAnnotation', ['$document', function($document){
		
		var imgElement = angular.element('<img ng-mousedown="mouseDownHandler($event, \'img\')" class="img-mask" src="img/brusli.jpeg">');
		
		var spanElements = [];

		var span_tl = angular.element("<span ng-mousedown='mouseDownHandler($event, \"tl\")' class='handler top-left'></span>");
		var span_tr = angular.element("<span ng-mousedown='mouseDownHandler($event, \"tr\")' class='handler top-right'></span>");
		var span_bl = angular.element("<span ng-mousedown='mouseDownHandler($event, \"bl\")' class='handler bottom-left'></span>");
		var span_br = angular.element("<span ng-mousedown='mouseDownHandler($event, \"br\")' class='handler bottom-right'></span>");
		
		var maskElement = angular.element('<div class="mask-div"></div>');
		
		

		var link = function(scope, elm){
			var startX, startY, initialMouseX, initialMouseY, 
				w, h, initialW, initialH, dx, 
				dy, top, left, source;	
			
			initialW = 180;
			initialH = 110;	
			
			scope.mouseDownHandler = function($event, _source_){
				startX = maskElement.prop('offsetLeft');
				startY = maskElement.prop('offsetTop');
				
				initialMouseX = $event.clientX;
        initialMouseY = $event.clientY;

        source = _source_;

        $document.bind('mousemove', mousemove);
        $document.bind('mouseup', mouseup);

			}

			function mousemove($event) {
      	switch (source){
      		case 'img':
      			coef = [1, 1, 0, 0];
      			break;
      		case 'tl':
      			coef = [1, 1, -1, -1];
      			break;
      		case 'tr':
      			coef = [0, 1, 1, -1];
      			break;
      		case 'bl': 
      			coef = [1, 0, -1, 1];
      			break;
      		case 'br':
      			coef = [0, 0, 1, 1];
      			break;

      	}
      
      	dx = $event.clientX - initialMouseX;
        dy = $event.clientY - initialMouseY;
        
        left = startX + coef[0] * dx;
        top = startY + coef[1] * dy;
       	if( left < 0 ) { left = 0; }
       	if( top < 0 )	{ top = 0; }
        w = initialW + coef[2] * dx;
        h = initialH + coef[3] * dy;

        if ( (left + w) > 400 ) { w = 400 - left;}
        
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


        return false;
      };

      function mouseup($event){
      	initialW = w;
      	initialH = h;

      	$document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
      };





		};

		return {
			restrict: 'E',
			scope: {},
			template: '<div class="annotation-container"><img class="img-original" src="img/brusli.jpeg"></div>',
			controller: function($scope){
				
			
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

