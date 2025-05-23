let video;
let facemesh;
let predictions = [];

const FACEMESH_POINTS = [
  409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291,
  76,77,90,180,85,16,315,404,320,307,306,408,304,303,302,11,72,73,74,184
];

function setup() {
  createCanvas(640, 480).parent(document.body);
  // 讓畫布致中
  let cnv = document.querySelector('canvas');
  cnv.style.display = 'block';
  cnv.style.margin = 'auto';
  cnv.style.position = 'absolute';
  cnv.style.top = '0';
  cnv.style.left = '0';
  cnv.style.right = '0';
  cnv.style.bottom = '0';
  cnv.style.transform = 'translateY(50%)';

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', gotResults);
}

function modelReady() {
  // 模型載入完成
}

function gotResults(results) {
  predictions = results;
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  drawFacemeshLines();
}

function drawFacemeshLines() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;
    stroke(255, 0, 0);
    strokeWeight(5);
    noFill();
    beginShape();
    for (let i = 0; i < FACEMESH_POINTS.length; i++) {
      let idx = FACEMESH_POINTS[i];
      if (keypoints[idx]) {
        vertex(keypoints[idx][0], keypoints[idx][1]);
      }
    }
    endShape();
  }
}
