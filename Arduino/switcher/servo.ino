void toggleServoPosition() {
  if (servoMoving) {
    return;
  }
  servoMoving = true;
  digitalWrite(SERVO_WRITE_LED_PIN, HIGH);

  if (servo.read() == 0) {
    servo.write(180);
  } else {
    servo.write(0);
  }
  delay(500);

  digitalWrite(SERVO_WRITE_LED_PIN, LOW);
  servoMoving = false;
}
