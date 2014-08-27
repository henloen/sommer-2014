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
            replace: false,
            scope: false,
		    link: function (scope, element, attrs, ngModelCtrl) {
		    	
				var ctx = element[0].getContext('2d');

			 	var width = ctx.canvas.width  = window.innerWidth;
			 	var height = ctx.canvas.height = window.innerHeight;
			
				var questions = scope.questions;
				
				
				var categories = [];
				
				var coordList = new Object();
				var maxYOptions = 1;
				
				
				// set up data in a simpler structure
				for(var propt in questions){
					for(var p in questions[propt]) {
						categories.push(questions[propt][p]);
						if (maxYOptions < questions[propt][p]['options'].length) {
							maxYOptions = questions[propt][p]['options'].length;
						}
					}
				}
				
				window.addEventListener('resize', resize, false);
				window.addEventListener('orientationchange', resize, false);
				
			
				function resize() {
				    width = ctx.canvas.width  = window.innerWidth;
				 	height = ctx.canvas.height = window.innerHeight;
					draw();
				}
			
				
		    	// canvas reset
		    	function reset(){
		       		element[0].width = element[0].width; 
		    	}
		
				function getRandomInt(min, max) {
				  return Math.floor(Math.random() * (max - min + 1)) + min;
				}

		    	function draw(){
					reset();
					var lX = width / 100 * 2;  
					var lY = height / 100 * 2;  // shouild be calc from height / maxOptions - font heigth
					var restHeight = height - lY * 2;
					var interval = restHeight / maxYOptions;
					
					var tempX = 0;
					var oldX = lX;
					for (var t in categories) {
						ctx.strokeStyle = "#FFFFFF";
						ctx.fillStyle = "#FFFFFF";
						ctx.lineWidth = 1;					
						ctx.font = 'bold 10pt Calibri';
						ctx.fillText(categories[t]['title'].toUpperCase(),lX + tempX,lY);
						
						var tempY = restHeight / categories[t]['options'].length / 2;
						for (var u in categories[t]['options'])	{
							var randomInt = + getRandomInt(0, 40);
							ctx.lineWidth = 1;
							ctx.strokeStyle = "#FFFFFF";
							ctx.fillStyle = "#FFFFFF";
							ctx.font = 'bold 8pt Calibri';
							ctx.fillText(categories[t]['options'][u]['output'].toUpperCase(), lX + tempX + (ctx.measureText(categories[t]['title'].toUpperCase()).width / 2) - (ctx.measureText(categories[t]['options'][u]['output'].toUpperCase()).width / 2)  ,tempY + randomInt);	
							var coord = {};
							coord['x'] = lX + tempX + (ctx.measureText(categories[t]['title'].toUpperCase()).width / 2)  ;
							coord['y'] = tempY  - 15  + randomInt;

							ctx.strokeStyle = "#FFFFFF";
							ctx.fillStyle = "#FFFFFF";
							drawCircle(ctx, coord['x'], coord['y']);
							coordList[categories[t]['options'][u]['value']] = coord;
							tempY += interval;
						}
						
						tempX += (width) / categories.length;
					}
					ctx.stroke();
					
					// draw line under headings
					ctx.strokeStyle = "#FFFFFF";
					ctx.fillStyle = "#FFFFFF";
					ctx.moveTo(0, lY + 5);
					ctx.lineTo(width, lY + 5);
					ctx.stroke();
					
					
					for (var i = 0; i < scope.answers.length; i++) {
						
						var startX = null;
						var startY = null;
						var toX = null;
						var toY = null;

                        ctx.strokeStyle = getRandomColor();

						// for single answer visualization
						if (scope.answers.length == 1) {
							console.log(scope.answers[i]["kjonn"]);
                        	if (scope.answers[i]["kjonn"] === "mann") {
					       		ctx.strokeStyle = "#FFFFFF";
                        	} else {
                            	ctx.strokeStyle = "#ff6400";
                        	}
                        }


						ctx.lineWidth = 1;
						for (var p in scope.answers[i]) {
							if (scope.answers[i].hasOwnProperty(p)) {
							   var c = coordList[scope.answers[i][p]];
							   if (c != null) {
								 if (startX == null && startX == null) {
									startX = c['x'] + Math.random() * (2 - -2) + -2;
									startY = c['y'] + Math.random() * (2 - -2) + -2;
								} else {
	
								   toX = c['x'] + Math.random() * (2 - -2) + -2;
								   toY = c['y'] + Math.random() * (2 - -2) + -2;
								   if(startX <= toX) {
											   ctx.beginPath();
											   ctx.moveTo(startX,startY);
											   ctx.lineTo(toX, toY);
											   ctx.stroke();
											   startX = c['x'];
											   startY = c['y'];
								   }
								   
								}
							   }
							}
						}
					}	
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
					
					//context.strokeStyle = '#003300';
					context.stroke();
				}
				
				scope.$on('draw', function() {
                   console.log("event received");
				   draw();
				});			
			}
			
		};
	});



	
