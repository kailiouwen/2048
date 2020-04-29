var board = new Array();//游戏数据
var score = 0;
// 对应每个格子是否发生碰撞
var hasConflicted = new Array();

// 初始换触摸点，起始位置和结束位置
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

// 程序加载完毕运行这个函数
$(document).ready(function(){
	//prepareForMobile();//移动端的显示
	newgame();
});



/*function prepareForMobile(){

	if( documentWidth > 500){
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;

	}

	$('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);

	$('.grid-cell').css('width',cellSideLength);
	$('.grid-cell').css('height',cellSideLength);
	$('.grid-cell').css('border-radius',0.02*cellSideLength);

}
*/

function newgame(){
	// 初始化棋盘格
	init(); 

	// 在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
	// 生成两次，调用两次

}

function init(){
	for( var i = 0; i < 4; i++)
		for(var j = 0 ; j < 4 ; j++){

			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css('top',getPosTop( i,j ) );// 获取距离顶部的值
			gridCell.css('left',getPosLeft( i,j ) );// 获取距离左边的值

		}
	for( var i = 0 ;i < 4 ; i ++){
		board[i] = new Array();//变为2维数组
		hasConflicted[i] = new Array();
		for(var j = 0 ; j < 4; j ++)
			board[i][j] = 0;//初始化
			hasConflicted[i][j] = false;// 初始没有发生碰撞
	}

	updateBoardView();//nb

	score = 0;

}

function updateBoardView(){
	$(".number-cell").remove();
	for(var i = 0; i < 4 ; i++)
		for( var j = 0 ; j < 4 ; j ++){
			// 在grid-container下添加一些number-cell, grid-cell 和 number-cell 是并列的
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $("#number-cell-"+i+"-"+j);//操作

			if(board[i][j] == 0){
				// 初始化为width，height 0
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j) + 50);//假设i=0,那么top:70;边距20，盒子也就是没有显示，可以理解为不存在
				theNumberCell.css('left',getPosLeft(i,j) + 50);// 100/2=50
				//放中间

			}else{
				theNumberCell.css('width','100');//100
				theNumberCell.css('height','100');
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				//宽高和gird-cell一样
				theNumberCell.css('background-color','getNumberBackgroundColor(board[i][j])');
				//根据传入i j 值 显示对应颜色
			 	theNumberCell.css('color',getNumberColor( board[i][j] ) );
			 	// 全景色
			 	theNumberCell.text( board[i][j] );
			 	// 显示数字颜色值




			}
			hasConflicted[i][j] = false;// 发生碰撞之后归位为初始状态，没有碰撞
		}
		// 移动端显示 数字
		//$('.number-cell').css('line-height',cellSideLength+'px');
		//$('.number-cell').css('font-size',0.6*cellSideLength+'px');

}

function generateOneNumber(){
	// 当 generateOneNumber()调用nospace()时，如果nospace()返回的是true，表示不可以随机生成一个数字，generateOneNumber()返回false
	// 当 generateOneNumber()调用nospace()时，如果nospace()返回的是false,表示可以随机生成一个数字, generateOneNumber()返回true
	if( nospace(board))
		return false;

	// 1 随机一个位置 
	/*
	* Math.random()  0-1的浮点数
	* Math.random() * 4
	* Math.floor()		取整还是浮点数
	* parseInt()		强制整型
	*/
	var randx = parseInt( Math.floor(Math.random() * 4) );
	var randy = parseInt( Math.floor(Math.random() * 4) );
	// 优化
	var times = 0;
	while( times < 50 ){// 如果true是死循环，现在循环50限度
		if(board[randx][randy] == 0)
			break;
	// 如果不是0 ，继续生成随机数进行判断（这里不写var 是进行重新赋值if(board[randx][randy] == 0)）
	 randx = parseInt( Math.floor(Math.random() * 4) );
	 randy = parseInt( Math.floor(Math.random() * 4) );
	 times ++;

	}
	// 如果循环50次没有找到位置，手动生成一个
	if( times == 50 ){
		for( var i = 0 ; i < 4 ; i++ )
			for( var j = 0 ; j < 4 ; j++){
				if( board[i][j] == 0 ){
					randx = i;
					randy = j;
				}
			}
	}


	// 2 随机一个数字（2 4）
	var randNumber = Math.random() < 0.5?2:4;// 生成 2 和 4 各50%概率
 
	// 3 在随机位置显示随机数字
	board[randx][randy] = randNumber;
	// 4 通知前端添加数字
	showNumberitAnimation(randx,randy,randNumber);//坐标，坐标和数字
	

	
	//否则可以生成
	return true; 
}

// 键盘交互
$(document).keydown( function( event) {
	// ## bug2 游戏滚动条随着游戏移动而移动
	event.preventDefault();// 阻止键盘默认操作，这个方法是Android

	switch( event.keyCode ){
		case 37: //left
			if( moveLeft() ){
				setTimeout("generateOneNumber()",210);//设置定时器，移动一次，生成一个数字
				setTimeout("isgameover()",300); 
			}
			break;

		case 38: //up
			if( moveUp() ){
				setTimeout("generateOneNumber()",210);//移动一次，生成一个数字
				setTimeout("isgameover()",300); 
			}
			break; 

		case 39: //right
			if( moveRight() ){
				setTimeout("generateOneNumber()",210);//移动一次，生成一个数字
				setTimeout("isgameover()",300); 
			}
			break;

		case 40: //down
			if( moveDown() ){
				setTimeout("generateOneNumber()",210);//移动一次，生成一个数字
				setTimeout("isgameover()",300); 
			}
			break;

		default: //default 不执行
			break;
	}
});

// 捕捉事件
// 捕捉到 touchstart 之后响应一个匿名函数
document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;// 起始 单点触摸 数组 x y 轴
	starty = event.touches[0].pageY;
});
document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;// 结束
	endy = event.changedTouches[0].pagey;

	// 判断向那个方向移动，x 或 y ,在计算机坐标轴中，x正数右边，y 正数下边
	var deltax = endx - startx;// 值大于0,表示向右边（正数）移动
	var deltay = endx - starty;

	// ## bug1 点击移动->表示了触摸事件，离开也就是移动事件
	if( Math.abs( deltax ) < 0.3*documentWidth && Math.abs( deltay ) < 0.3*documentWidth )//小于移动设备宽度的0.3倍，不移动
		return;//返回函数， 不执行下面了

	// 使用 Matn.abs 判断 deltax 和 deltay 的长度
	// x
	if( Math.abs( deltax ) >= Math.abs( deltay ) ){

		if( deltax > 0 ){
			// move right
			if( moveRight() ){
				// 移动和 键盘一样的方法
				setTimeout("generateOneNumber()",210);//移动一次，生成一个数字
				setTimeout("isgameover()",300); 
			}
		}
		else{
			// move left
			if( moveLeft() ){
				setTimeout("generateOneNumber()",210);//移动一次，生成一个数字
				setTimeout("isgameover()",300); 
			}
		}
	}
	// y
	else{
		if( deltay > 0 ){
			// move down ,计算机中，坐标轴y正数是往下，所以down表示正方向
			if( moveDown() ){
				setTimeout("generateOneNumber()",210);//移动一次，生成一个数字
				setTimeout("isgameover()",300); 
			}
		}
		else{
			// move up
			if( moveUp() ){
				setTimeout("generateOneNumber()",210);//移动一次，生成一个数字
				setTimeout("isgameover()",300); 
			}
		}

	}
});



function isgameover(){
	// 满足nospace没有空间和nomove不可移动表示游戏结束
	if( nospace( board ) && nomove( board )){
		gameover();
	}

}

function gameover(){
	alert('gameover!');
}

function moveLeft(){
	// 1.判断是否可以向左移动

	if( !canMoveLeft( board ))
		return false;
	//如果不能左移动，返回为false,把当前情况board传进去,canMoveLeft(board)如果可以移动返回true，！canMoveLeft(board)表示！true,返回false

	// 2.moveLeft 真正向左移动
	/*
		* 真正向左移动
		* 1.叠加数字 2.产生一个新的数字 3.什么都没有发生
		* 条件：
			* 落脚位置是否为空？
			* 落脚位置数字和待判定元素数字相等？
			* 移动路径中是否有障碍物？
	*/
	for( var i = 0 ; i < 4 ; i ++ )
		for( var j = 1 ; j < 4 ; j ++ ){
			if( board[i][j] != 0){
				for( var k = 0 ; k < j ; k ++ ){// 遍历j
					if( board[i][k] == 0 && noBlockHorizontal(i,k,j,board) ){
						// move
						showMoveAnimation(i , j , i , k );
						board[i][k] = board[i][j];
						board[i][j] = 0;

						continue;
					}
					// 默认 hasConflicted[i][k]=false，表示没有碰撞，！hasConflicted 表示没有发生碰撞
					else if( board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k] ){
						// move
						showMoveAnimation(i , j , i , k );
						// add 叠加
						board[i][k] += board[i][j];
						board[i][j] = 0;
						// add score 在这个环节才会增加分数
						score += board[i][k];
						updateScore( score );//更新分数，显示在前端
						hasConflicted[i][k] = true;// 发生碰撞了，这次不能在[i][k]这个位置碰撞了，重新初始化即可
						continue;
					}
				}
			}
		}




	setTimeout("updateBoardView()",200);//定时器显示showMoveAnimation动画

	return true;

}



function moveRight(){
	// 1.判断是否可以向右边移动
	if( !canMoveRight(board))
		return false;
	// 2.真正向右边移动
	for( var i = 0 ; i < 4 ; i++ )
		for( var j = 2 ; j >= 0 ; j-- ){// 最右边的列移动不了
			if( board[i][j] !=0 ){
				for( var k = 3 ; k > j ; k-- ){// 遍历j
					if( board[i][k] == 0 && noBlockHorizontal(i,j,k,board) ){
						// move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;

						continue;
					}
					else if( board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) ){
						// move
						showMoveAnimation(i,j,i,k);
						board[i][k] *= 2;// board[i][k] += board[i][j]
						board[i][j] = 0;

						score += board[i][k];
						updateScore( score );
						continue;
					}
				}
			}
		}

		setTimeout("updateBoardView()",200);
	return true;

}


function moveUp(){
	// 1.判断是否可以向上移动
	if( !canMoveUp( board ))
		return false;
	// 2.真正向上面移动
	for( var i = 1 ; i < 4 ; i++ )// 第一行无法上移动
		for( var j = 0 ; j < 4 ; j++ ){
			if( board[i][j] != 0 ){
				for( var k = 0 ; k < i ; k ++ ){// 遍历i
					if( board[k][j] == 0 && noBlockVertical(j,k,i,board) ){
						// move
						showMoveAnimation(i , j , k , j);
						board[k][j] = board[i][j];
						board[i][j] = 0;

						continue;
					}
					else if( board[k][j] == board[i][j] && noBlockVertical(j,k,i,board)){
						// move
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score += board[k][j];
						updateScore( score );

						continue;
					}
				}
			}
		}

		setTimeout("updateBoardView()",200);



	return true;

	// 2.moveUp 真正向上面移动



}


function  moveDown(){
	// 1.判断是否可以向下边移动
	if (!canMoveDown(board))
		return false;
	// 2.真正向下边移动
	for( var i = 2 ; i >=0 ;i-- )// 最下边的行移动不了
		for( var j = 0 ; j < 4 ; j++ ){
			if( board[i][j] !=0 ){
				for( var k = 3 ; k > i ; k-- ){// 遍历i
					if( board[k][j] == 0 && noBlockVertical(j,i,k,board) ){
						// move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if( board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) ){
						// move
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score += board[k][j];
						updateScore( score );
						continue;
					}

				}
			}

		}
		setTimeout("updateBoardView()",200);
	return true;

}


