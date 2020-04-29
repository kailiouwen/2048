// 主游戏自适应设计
//documentWidth = window.screen.availWidth;// 根据当前屏幕宽度，也就是参照物（iPhone4,iPhone5等）,决定其他子单元的大小
//gridContainerWidth = 0.92 * documentWidth;// 游戏主体在宽度中比重
//cellSideLength = 0.18 * documentWidth;// 每个格子的比重
//cellSpace = 0.04 * documentWidth;// 每个格子边距的比重，一共七个间距
// 提示 cellSideLength + cellSpace = gridContainerWidth 0.92


function getPosTop(i,j){
	return 20 + i*120;
	//return cellSpace + i*(cellSpace+cellSideLength);// 间距 +ｉ＊（间距+方格大小）
}

function getPosLeft(i,j){
	return 20 + j*120;  
	//return cellSpace + i*(cellSpace+cellSideLength);
}

function getNumberBackgroundColor( number ){
	switch( number ){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#eee4da";break;
		case 32:return "#eee4da";break;
		case 64:return "#eee4da";break;
		case 128:return "#eee4da";break;
		case 256:return "#eee4da";break;
		case 512:return "#eee4da";break;
		case 1024:return "#eee4da";break;
		case 2048:return "#eee4da";break;
		case 4096:return "#eee4da";break;
		case 8192:return "#eee4da";break;
	}
	// 根据number不同数字返回不同背景颜色

	return "black";
	//  都不满足就是黑色
}

// 数字颜色，大于4返回白色

function getNumberColor( number ){
	if( number <= 4)
		return "#776e65";

	return "white";
}


// 判断是否可以生成数字
function nospace(board){

	for(var i = 0 ; i < 4 ; i++)
		for(var j = 0 ; j < 4;j++)
			if(board[i][j] == 0)
				return false;//表示还有空间
			
		
		return true; 
		//表示没有空间
}

// 判断是否可以左移动
function canMoveLeft( board ){

	for( var i = 0 ; i < 4 ; i ++)
		for( var j = 1 ; j < 4 ; j ++)//最左边的j默认是移动不了，所以j从第一列开始
			if( board[i][j] !=0)//表示这个数字存在
				if( board[i][j-1] == 0 || board[i][j-1] == board[i][j] )
					// 第一个条件成立表示 j 左边是空，或者 第二个条件成立bo ard和左边的数字 相等，
					// 满足以上两个条件之一可以移动，返回true
					return true;

	return false;
}

// 判断是否可以向上移动
function canMoveUp( board ){
	for( var i = 1 ; i < 4; i++)
		for(var j = 0 ; j < 4 ; j++)
			if( board[i][j] !=0 )
				if( board[i-1][j] == 0 || board[i-1][j] == board[i][j])
					return true;

	return false;
}

// 判断是否可以向右边移动
function canMoveRight( board ){
	for( var i = 0 ; i < 4 ; i++)
		for( var j = 2 ; j >= 0 ; j--)//最右边的j列默认是移动不了
			if( board[i][j] !=0 )
				if( board[i][j+1] == 0 || board[i][j+1] == board[i][j])
					return true;

	return false;

}

// 判断是否可以向下移动
function canMoveDown( board ){
	for( var i = 2 ; i >= 0 ; i--)
		for( var j = 0 ; j < 4 ; j++)
			if( board[i][j] !=0)
				if( board[i+1][j] == 0 || board[i+1][j] == board[i][j])
					return true;

	return false;
}

// 判断 Left和Right 是否有障碍物
function noBlockHorizontal(row,col1,col2,board){
	for( var i = col1 + 1 ; i < col2 ; i ++)
		if( board[row][i] !=0 )// 不等于0表示要移动的位置有障碍物，返回false
			return false;//存在障碍物，这里有bug

	return true;//返回值为true,表示没有障碍物
}

// 判断 Up和Down 是否有障碍物
function noBlockVertical(col,row1,row2,board ){
	for( var i = row1 + 1 ; i < row2 ; i ++)
		if( board[i][col] !=0 )//存在障碍物
			return false;

		return true;// 返回true,表示没有障碍物
}

// 判断游戏是否可以移动，如果不可移动和nospace（）没有空间，游戏结束
function nomove( board){
	if( canMoveLeft( board ) ||
		canMoveRight( board ) ||
		canMoveUp( board ) ||
		canMoveDown( board ) )
		return false;// 可以移动

	return true;
}




