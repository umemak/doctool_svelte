
resource "aws_lambda_function" "api" {
  function_name = "lambda_minimum_serverless_api"
  role          = aws_iam_role.api.arn
  package_type  = "Image"
  memory_size   = "512"
  timeout       = "60"
  image_uri     = "${local.aws_account_id}.dkr.ecr.${local.region}.amazonaws.com/${aws_ecr_repository.api.name}:latest"
  architectures = ["x86_64"]

  lifecycle {
    ignore_changes = [image_uri]
  }

  environment {
    variables = {
        ENV="HOGE"
    }
  }

  tracing_config {
    mode = "PassThrough"
  }

  depends_on = [aws_ecr_repository.api]
}


resource "aws_iam_role" "api" {
  name                 = "lambda_minimum_serverless_api_role"
  description          = "Allows api of lambda to call AWS services."
  assume_role_policy   = data.aws_iam_policy_document.api_assume_policy.json
  max_session_duration = "3600"
}

data "aws_iam_policy_document" "api_assume_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"
    principals {
      identifiers = [
        "lambda.amazonaws.com"
      ]
      type = "Service"
    }
  }
}

resource "aws_iam_role_policy_attachment" "api" {
  role       = aws_iam_role.api.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


/**
 * LambdaのFunction URLを作成する
 */
resource "aws_lambda_function_url" "api_url" {
  function_name      = aws_lambda_function.api.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = false
    allow_headers = [
      "*",
    ]
    allow_methods = [
      "*",
    ]
    allow_origins = [
      "*",
    ]
    expose_headers = [
      "*",
    ]
    max_age = 0
  }
}

resource "aws_lambda_permission" "api_url" {
  statement_id           = "FunctionURLAllowPublicAccess"
  action                 = "lambda:InvokeFunctionUrl"
  function_name          = aws_lambda_function.api.arn
  function_url_auth_type = "NONE"
  principal              = "*"
}
