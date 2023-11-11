# terraform {
#   backend "s3" {
#     bucket = "lambda-minimum-serverless-api.mydomain"
#     region = "ap-northeast-1"
#     key = "tfstate/lambda-minimum-serverless-api.tfstate"
#   }
# }

locals {
  region = var.region
  aws_account_id = var.aws_account_id
}
