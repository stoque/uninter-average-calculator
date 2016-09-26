var $btnCalcula = document.querySelector('#btnCalcula');

$btnCalcula.addEventListener('click', calculaMedia);

function calculaNota1() {
  $po = parseInt(document.querySelector('#po').value);

  n1 = $po * 30;

  return n1;
}

function calculaNota3() {
  $apol01 = parseInt(document.querySelector('#apol01').value);
  $apol02 = parseInt(document.querySelector('#apol02').value);
  $apol03 = parseInt(document.querySelector('#apol03').value);
  $apol04 = parseInt(document.querySelector('#apol04').value);
  $apol05 = parseInt(document.querySelector('#apol05').value);

  n3 = (($apol01 + $apol02 + $apol03 + $apol04 + $apol05) / 5) * 20;

  return n3;
}

function calculaNota4() {
  $ap     = parseInt(document.querySelector('#ap').value);
  $pd     = parseInt(document.querySelector('#pd').value);

  if ($ap && $pd ) {
    n4 = (($ap * 0.4) + ($pd * 0.6)) * 50;
  }
  else if ($ap) {
    n4 = $ap * 50;
  }
  else if ($pd) {
    n4 = $pd * 50;
  }

  return n4;
}

function calculaMedia() {
  $info         = document.querySelector('#info');

  calculaNota1();
  calculaNota3();
  calculaNota4();

  md = parseInt((n1 + n3 + n4) / 100);
  // $info.textContent = md;

  if (md >= 70) {
    $info.innerHTML = 'Parabéns, sua média foi ' + '<strong>' + md + '</strong>' + ' e você foi <strong class="success">aprovado!</strong>'
  }
  else if (md >= 30 && md <= 69) {
    $info.innerHTML = 'Infelizmente sua média foi ' + '<strong>' + md + '</strong>'  + ' e você está de <strong class="warning">exame!</strong>';
  }
  else if (md <= 29) {
    $info.innerHTML = 'Infelizmente sua média foi ' + '<strong>' + md + '</strong>'  + ' e você está de <strong class="error">reprovado!</strong>';
  }
}
