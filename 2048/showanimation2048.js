// 动画添加数字到页面中
function showNumberitAnimation(i,j,randNumber){
	// 此时已经生成数字了
	var numberCell = $("#number-cell-" + i + "-" + j);

	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
	numberCell.text(randNumber); 

	numberCell.animate({
		width:"100px",
		height:"100px",
		top:getPosTop(i,j),
		left:getPosLeft(i,j)

	},50);


}


// 移动动画
function showMoveAnimation( fromx, fromy, tox, toy ){
	// moveLeft:showMoveAnimation(i , j , i , k );
	// moveUp:showMoveAnimation(i , j , k , j);
	// moveRight:showMoveAnimation(i , j , i , k );
	// moveDown:showMoveAnimation(i , j , k , j );

	var numberCell = $('#number-cell-' + fromx + '-' + fromy);
	numberCell.animate({
		top:getPosTop( tox,toy),
		left:getPosLeft( tox,toy)
	},200);

}

function updateScore( score ){
	$('#score').text( score );
}
