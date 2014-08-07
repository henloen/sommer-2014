/*global $:false */
"use strict";

/*Directives*/

angular.module("bodApp.directives", [])

    /*
    A custom directive partly based on a fix found on github, modified to work in our case
    We had a problem with combining a component of twitter bootstrap radio buttons and angular js forms with radio buttons,
    as both frameworks listened for the same event. This directive needs to be added to our radio buttons, and makes sure the 
    radio buttons are marked as checked for angular as well as twitter bootstrap
    */
    .directive("makeRadioButtonDetectChange", [function makeRadioButtonDetectChange() {
        return {
                restrict: "A",
                replace: false,
                require: 'ngModel',
                scope: false,
                link: function (scope, element, attrs, ngModelCtrl) {
                    $(element).change(function () {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(element[0].type.toLowerCase() == 'radio' ? element[0].value : element[0].checked);
                        });
                    });
                }
            };
    }])
	.directive('drawing', function() {
	 	return {
		    restrict: "A",
            replace: false,
            scope: false,
		    link: function (scope, element, attrs, ngModelCtrl) {
		    	var ctx = element[0].getContext('2d');

			 	ctx.canvas.width  = window.innerWidth;
			 	ctx.canvas.height = window.innerHeight;
			
				var questions = scope.questions;
				
				
				var categories = [];
				
				var coordList = new Object();
				
				// set up data in a simpler structure
				for(var propt in questions){
					for(var p in questions[propt]) {
						categories.push(questions[propt][p]);
					}
				}
		    	// canvas reset
		    	function reset(){
		       		element[0].width = element[0].width; 
		    	}

		    	function draw(){
					reset();
					console.log("starting drawing");
					var lX = 20;
					var lY = 20;

					var tempX = 0;
					
					for (var t in categories) {
						ctx.strokeStyle = "#FF0000";
						ctx.lineWidth = 1;					
						ctx.strokeText(categories[t]['title'],lX + tempX,lY);
						var tempY = 100;

						
						for (var u in categories[t]['options'])	{
							ctx.strokeStyle = "#4bf";
							ctx.fillStyle = null;
							ctx.lineWidth = 1;
							ctx.strokeText(categories[t]['options'][u]['output'],lX + tempX,lY+tempY);	
							drawCircle(ctx,lX+tempX,tempY);
							var coord = {};
							coord['x'] = lX + tempX;
							coord['y'] = tempY;
							coordList[categories[t]['options'][u]['value']] = coord;
							tempY += 100;
						}
						tempX += 150;
					}
					ctx.stroke();
					
					for (var i = 0; i < scope.answers.length; i++) {
						
						var startX = null;
						var startY = null;
						var toX = null;
						var toY = null;
						ctx.strokeStyle = getRandomColor();
						ctx.lineWidth = 1;
						for (var p in scope.answers[i]) {
							if (scope.answers[i].hasOwnProperty(p)) {
							   console.log(p);
							   var c = coordList[scope.answers[i][p]];
							   if (c != null) {
								 if (startX == null && startX == null) {
									startX = c['x'] + Math.random() * (2 - -2) + -2;
									startY = c['y'] + Math.random() * (2 - -2) + -2;
								} else {
	
								   toX = c['x'] + Math.random() * (2 - -2) + -2;
								   toY = c['y'] + Math.random() * (2 - -2) + -2;
								   if(startX < toX) {
											   ctx.beginPath();
											   ctx.moveTo(startX,startY);
											   ctx.lineTo(toX, toY);
											   ctx.stroke();
											   console.log(p + " ," + "coords : " + startX + ", " + startY + " to " + toX + ", " + toY);
											   startX = c['x'];
											   startY = c['y'];
								   }
								   
								}
							   } else {
								console.log(p + " is null");
							   }
							}
						}
					}	
					console.log("ending draw");
				}
				
				function getRandomColor() {
				    var letters = '0123456789ABCDEF'.split('');
				    var color = '#';
				    for (var i = 0; i < 6; i++ ) {
				        color += letters[Math.floor(Math.random() * 16)];
				    }
				    return color;
				}
				
				function drawCircle(context, centerX, centerY) {
					var radius = 2;
					context.beginPath();
					context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
					context.fillStyle = 'green';
					context.fill();
					context.lineWidth = 5;
					context.strokeStyle = '#003300';
					context.stroke();
					
				}
				
				scope.$on('draw', function() {
				   draw();
				});
			
			}
		};
	});



	
