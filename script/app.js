angular.module('myApp', []);

angular.module('myApp')
	.directive('myAnnotation', ['$document', function($document){
		var imgElement = angular.element('<img class="img-mask" src="img/brusli.jpeg">');
		var span_tl = angular.element("<span class='handler top-left'></span>");
		var span_tr = angular.element("<span class='handler top-right'></span>");
		var span_bl = angular.element("<span class='handler bottom-left'></span>");
		var span_br = angular.element("<span class='handler bottom-right'></span>");
		
		var maskElement = angular.element('<div class="mask-div" ng-click="maskSelected($event)"></div>');
		var link = function(scope, elm){
			var startX, startY, initialMouseX, initialMouseY, w, h, initialW, initialH, dx, dy, top, left;	
			initialW = 180;
			initialH = 110;	
			

			imgElement.bind('mousedown', function($event) {
        startX = maskElement.prop('offsetLeft');
        startY = maskElement.prop('offsetTop');
        initialMouseX = $event.clientX;
        initialMouseY = $event.clientY;
        $document.bind('mousemove', mousemove);
        $document.bind('mouseup', mouseup);
        $document.unbind('mousemove', mousemove_tl);
        $document.unbind('mouseup', mouseup_tl);
        return false;
      });

			span_tl.bind('mousedown', function($event){
				startX = maskElement.prop('offsetLeft');
				startY = maskElement.prop('offsetTop');
				initialMouseX = $event.clientX;
        initialMouseY = $event.clientY;

        $document.bind('mousemove', mousemove_tl);
        $document.bind('mouseup', mouseup_tl);
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
       
			});

			span_tr.bind('mousedown', function($event){
				startX = maskElement.prop('offsetLeft');
				startY = maskElement.prop('offsetTop');
				initialMouseX = $event.clientX;
        initialMouseY = $event.clientY;

        $document.bind('mousemove', mousemove_tr);
        $document.bind('mouseup', mouseup_tr);
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
       
			});

			span_bl.bind('mousedown', function($event){
				startX = maskElement.prop('offsetLeft');
				startY = maskElement.prop('offsetTop');
				initialMouseX = $event.clientX;
        initialMouseY = $event.clientY;

        $document.bind('mousemove', mousemove_bl);
        $document.bind('mouseup', mouseup_bl);
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
       
			});

			span_br.bind('mousedown', function($event){
				startX = maskElement.prop('offsetLeft');
				startY = maskElement.prop('offsetTop');
				initialMouseX = $event.clientX;
        initialMouseY = $event.clientY;

        $document.bind('mousemove', mousemove_br);
        $document.bind('mouseup', mouseup_br);
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
       
			});







			function mousemove_tl($event){
				dx = $event.clientX - initialMouseX;
        dy = $event.clientY - initialMouseY;
        left = startX + dx;
        top = startY + dy;
       
        w = initialW - dx;
        h = initialH - dy;
       
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
        	
        })

			};

			function mousemove_tr($event){
				dx = $event.clientX - initialMouseX;
        dy = $event.clientY - initialMouseY;
        left = startX ;
        top = startY + dy;
       
        w = initialW + dx;
        h = initialH - dy;
        
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
     };




			function mousemove_bl($event){
				dx = $event.clientX - initialMouseX;
        dy = $event.clientY - initialMouseY;

        left = startX +dx;
        top = startY ;
       
        w = initialW - dx;
        h = initialH + dy;
        
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
     };

    	function mousemove_br($event){
				dx = $event.clientX - initialMouseX;
        dy = $event.clientY - initialMouseY;

        left = startX;
        top = startY;
       
        w = initialW + dx;
        h = initialH + dy;
        
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
    	};

    	function mousemove($event) {
      	dx = $event.clientX - initialMouseX;
        dy = $event.clientY - initialMouseY;
        top = startY + dy;
        left = startX + dx;
        w = initialW;
        h = initialH;

        maskElement.css({
          top:  top + 'px',
          left: left + 'px',
          width: w + 'px',
          height: h + 'px'
        });

        var clip = 'rect(' + top + 'px, ' + ( left + initialW ) + 'px, ' +  (top + initialH) + 'px, ' + left + 'px)';
        imgElement.css({
        	top: parseInt(-top) + 'px',
        	left: parseInt(-left) + 'px',
        	clip: clip
        	
        })
        return false;
      };





			
     






      

      function mouseup_tl($event){
      	initialW = w;
      	initialH = h;
      	$document.unbind('mousemove', mousemove_tl);
        $document.unbind('mouseup', mouseup_tl);
      }

      function mouseup_tr($event){
      	initialW = w;
      	initialH = h;
      	$document.unbind('mousemove', mousemove_tr);
        $document.unbind('mouseup', mouseup_tr);
      }


      function mouseup_bl($event){
      	initialW = w;
      	initialH = h;
      	$document.unbind('mousemove', mousemove_bl);
        $document.unbind('mouseup', mouseup_bl);
      }

      function mouseup_br($event){
      	initialW = w;
      	initialH = h;
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

